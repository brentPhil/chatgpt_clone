"use client"

import { signIn } from "next-auth/react"
import GPTLogo from "./gptLogo"

function Login() {
  return (
    <div className="bg-gray-700 gap-2 text-gray-200 text-center h-screen flex flex-col items-center justify-center">
      <GPTLogo className="text-gray-200" />
      <h2 className="text-lg">Welcome to my ChatGPT clone!</h2>
      <h6 className="w-3/5 md:w-2/5 text-sm text-gray-300">
        Click below to start our conversation and get quick answers to your
        questions, or to just have a friendly chat with a virtual assistant.
        Let's get started!
      </h6>
      <button
        onClick={() => signIn("google")}
        className="text-white bg-[#10A37F] mt-1 py-2 px-4 rounded-md">
        Sign In
      </button>
    </div>
  )
}

export default Login
