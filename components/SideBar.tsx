"use client"

import { collection, orderBy, query } from "firebase/firestore"
import { useSession, signOut } from "next-auth/react"
import { useCollection } from "react-firebase-hooks/firestore"
import NewChat from "./NewChat"
import { db } from "@/firebase"
import ChatRow from "./ChatRow"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import ModelSelection from "./ModelSelection"

export default function SideBar() {
  const { data: session } = useSession()

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  )

  return (
    <div className="flex h-full flex-1 flex-col gap-1 space-y-1 p-2">
      <NewChat />

      {loading && (
        <div className="animate-pulse text-center text-white">
          <p>Loading Chats...</p>
        </div>
      )}
      <div className="flex flex-col relative flex-1 gap-1 overflow-y-auto border-b border-white/20">
        {chats?.docs.map((chat) => (
          <ChatRow key={chat.id} id={chat.id} />
        ))}
      </div>

      <div className="hidden sm:inline">
        <ModelSelection />
      </div>
      {session && (
        <div className="flex h-[50px] items-center">
          <img
            src={session.user?.image!}
            alt="profile"
            className="h-10 w-10 rounded-full cursor-pointer"
          />

          <button
            onClick={() => signOut()}
            className="flex w-full ml-3 p-2 h-full items-center gap-2 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <p>Log out</p>
          </button>
        </div>
      )}
    </div>
  )
}
