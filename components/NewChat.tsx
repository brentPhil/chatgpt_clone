"use client"

import React from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/firebase"

export default function NewChat() {
  const router = useRouter()
  const { data: session } = useSession()

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        messages: [],
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    )

    router.push(`/chat/${doc.id}`)
  }
  return (
    <div onClick={createNewChat} className="chatRow border border-white/20">
      <PlusIcon className="h-5 w-5" />
      New chat
    </div>
  )
}
