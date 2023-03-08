"use client"
import ChatInput from "@/components/ChatInput"
import {
  ExclamationTriangleIcon,
  BoltIcon,
  SunIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"

export default function Home() {
  const [prompt, setPrompt] = useState("")

  const id = ""

  const headers = `flex gap-3 items-center m-auto text-xl font-normal md:flex-col md:gap-2`
  const paragraphs = `w-full text-md bg-gray-50 dark:bg-white/5 p-4 rounded-md`

  return (
    <div className="relative h-full w-full flex flex-col overflow-hidden items-stretch flex-1">
      <div className="flex-1 overflow-hidden">
        <div className="relative h-full dark:bg-gray-800">
          <div className="overflow-y-auto h-full chat-container">
            <div className="flex w-full flex-col items-center text-sm dark:bg-gray-800">
              <div className="text-gray-800 dark:bg-gray-800 text-center m-auto w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100">
                <h1 className="text-4xl font-semibold text-center mt-[10vh] md:mt-40 mb-10">
                  ChatGPT
                </h1>
                <div className="flex flex-col md:flex-row items-start text-center gap-6 md:gap-3.5">
                  <div className="text-white flex flex-col gap-3.5 flex-1 w-full md:w-fit">
                    <div className={headers}>
                      <SunIcon className="h-8 w-8" />
                      <h2>Examples</h2>
                    </div>
                    <div className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                      <div
                        onClick={() =>
                          setPrompt("Explain quantum computing in simple terms")
                        }
                        className={`${paragraphs} cursor-pointer dark:hover:bg-gray-900`}>
                        "Explain quantum computing in simple terms" →
                      </div>
                      <p
                        className={`${paragraphs} cursor-pointer dark:hover:bg-gray-900`}>
                        "Got any creative ideas for a 10 year old's birthday?" →
                      </p>
                      <p
                        className={`${paragraphs} cursor-pointer dark:hover:bg-gray-900`}>
                        "How do I make an HTTP request in Javascript?" →
                      </p>
                    </div>
                  </div>
                  <div className="text-white flex flex-col gap-3.5 flex-1 w-full md:w-fit">
                    <div className={headers}>
                      <BoltIcon className="h-8 w-8" />
                      <h2>Capabilities</h2>
                    </div>
                    <div className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                      <p className={paragraphs}>
                        Remembers what user said earlier in the conversation
                      </p>
                      <p className={paragraphs}>
                        Allows user to provide follow-up corrections
                      </p>
                      <p className={paragraphs}>
                        Trained to decline inappropriate requests
                      </p>
                    </div>
                  </div>
                  <div className="text-white flex flex-col gap-3.5 flex-1 w-full md:w-fit">
                    <div className={headers}>
                      <ExclamationTriangleIcon className=" h-8 w-8" />
                      <h2>Limitations</h2>
                    </div>
                    <div className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                      <p className={paragraphs}>
                        May not always understand complex or nuanced questions
                      </p>
                      <p className={paragraphs}>
                        Does not have emotions or the ability to empathize
                      </p>
                      <p className={paragraphs}>
                        Can sometimes provide inaccurate or incomplete
                        information
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-ful h-48 md:h-32 flex-shrink-0"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 py-2 bg-gray-800 border-t-2 md:border-none border-gray-600 left-0 w-full md:bg-inherit md:!bg-gradient-to-b from-transparent via-gray-800 to-gray-800">
        <ChatInput chatId={id} />
        <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
          Free Research Preview. Our goal is to make AI systems more natural and
          safe to interact with. Your feedback will help us improve
        </div>
      </div>
    </div>
  )
}
