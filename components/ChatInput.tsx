"use client"

import { db } from "@/firebase"
import { ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import {
  addDoc,
  collection,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore"
import { useSession } from "next-auth/react"
import { FormEvent, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import ModelSelection from "./ModelSelection"
import { useCollection } from "react-firebase-hooks/firestore"

type Props = {
  chatId: string
}
export default function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("")
  const router = useRouter()
  const { data: session } = useSession()
  const [messages] = useCollection(
    chatId !== ""
      ? session &&
          query(
            collection(
              db,
              "users",
              session?.user?.email!,
              "chats",
              chatId,
              "messages"
            ),
            orderBy("createdAt", "asc")
          )
      : null
  )

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  })

  const handleInput = (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement
    textarea.style.height = "24px"
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  useEffect(() => {
    const textarea = document.querySelector("textarea")
    textarea!.addEventListener("input", handleInput)

    return () => {
      textarea!.removeEventListener("input", handleInput)
    }
  }, [])

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (chatId === "") {
      const doc = await addDoc(
        collection(db, "users", session?.user?.email!, "chats"),
        {
          messages: [],
          userId: session?.user?.email!,
          createdAt: serverTimestamp(),
        }
      )

      chatId = doc.id
      router.push(`/chat/${doc.id}`)
    }

    if (!prompt) return
    const input = prompt.trim()
    setPrompt("")

    const textarea = document.querySelector("textarea")

    if (textarea) {
      textarea.style.height = "24px"
    }

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatar.com/api/?name=${session?.user?.name}`,
      },
    }

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    )

    const messageTexts = messages?.docs.map((doc) => doc.data().text).join("\n")
    const concat =
      "Your name: B3 nards, You are a chatgpt clone made by: AgetroGraphic a junior front-end dev\nPrevious messages: " +
      messageTexts +
      "\nUser input: " +
      input
    const notification = toast.loading("ChatGPT is thinking...")

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        prompt: concat,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      toast.success("ChatGPT has reponded", { id: notification })
    })
  }

  const onEnterPress = (e: any) => {
    e.keyCode == 13 && e.shiftKey == false && sendMessage(e)
  }

  return (
    <form
      className="flex flex-col mx-2 lg:mx-auto lg:max-w-3xl gap-2 lg:pt-6"
      onSubmit={sendMessage}>
      <div className="flex flex-col flex-1 relative h-full">
        <div className="hidden ml-1 mt-1.5 w-full m-auto mb-2 gap-2 justify-center">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300/80 bg-gray-800 hover:bg-gray-700 rounded-md border border-gray-600/50">
            <ArrowPathIcon className="w-4 h-4 transform -scale-x-100" />
            Regenerate response
          </button>
        </div>
        <div className="flex flex-col flex-grow w-full py-3 pl-4 relative border border-black/10 bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 dark:text-white dark:bg-gray-700 dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
          <textarea
            tabIndex={0}
            disabled={!session}
            className="w-full h-[24px] min-h-[24px] max-h-[200px] p-0 pl-2 pr-7 outline-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0 resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={onEnterPress}
          />
          <button
            type="submit"
            disabled={!prompt || !session}
            className="absolute bottom-2.5 right-2.5 p-1 text-gray-500 rounded-md hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
            <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
          </button>
        </div>
      </div>
      <div className="md:hidden">
        <ModelSelection />
      </div>
    </form>
  )
}
