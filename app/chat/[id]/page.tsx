import Chat from "@/components/Chat"
import ChatInput from "@/components/ChatInput"
type Props = {
  params: {
    id: string
  }
}
export default function ChatPage({ params: { id } }: Props) {
  return (
    <div className="relative h-full w-full flex flex-col overflow-hidden items-stretch flex-1">
      <div className="flex-1 overflow-hidden">
        <div className="relative h-full dark:bg-gray-800">
          <div className="overflow-y-auto h-full chat-container">
            <Chat chatId={id} />
            <div className="w-ful h-48 md:h-32 flex-shrink-0"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 py-2 bg-gray-800 border-t-2 md:border-none border-gray-600 left-0 w-full md:bg-inherit md:!bg-gradient-to-b from-transparent via-gray-800 to-gray-800">
        <ChatInput chatId={id} />
        <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
          Free Research Preview. Our goal is to make AI systems more natural and
          safe to interact with. Your feedback will help us improve.
        </div>
      </div>
    </div>
  )
}
