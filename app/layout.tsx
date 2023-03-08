import ClientProvider from "@/components/ClientProvider"
import Login from "@/components/Login"
import { SessionProvider } from "@/components/SessionProvider"
import SideBar from "@/components/SideBar"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import "./globals.css"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="overflow-hidden w-full h-screen relative">
              <div className="hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
                <SideBar />
              </div>

              <ClientProvider />

              <div className="flex h-full flex-1 flex-col md:pl-[260px]">
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
