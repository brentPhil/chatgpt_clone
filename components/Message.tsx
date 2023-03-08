import { DocumentData } from "firebase/firestore"

type Props = {
  message: DocumentData
}
export default function Message({ message }: Props) {
  const isChatGPT = message.user.name === "ChatGPT"

  return (
    <div
      className={`w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 dark:bg-gray-800 ${
        isChatGPT && "!bg-gray-700"
      }`}>
      <div className="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
        <img src={message.user.avatar} alt="" className="h-8 w-8" />
        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
          <div className="flex flex-grow flex-col gap-3">
            <div className="min-h-[20px] flex items-start pr-4">
              {message.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
