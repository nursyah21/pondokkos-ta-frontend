import ThemeRegistry from "./themeRegistry"
// import { NextAuthProvider } from "./provider"
import Navbar from "@/app/components/Navbar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const metadata = {
  title: 'pondok kos',
  description: 'Generated by create next app',

}

async function getUserData(email) {
  const exists = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  return exists
}

export default async function RootLayout({ children }, NextResponse) {
  const session = await getServerSession(authOptions)
  let user = null
  if (session) {
    user = await getUserData(session.user?.email)
    user = {
      id: user.id,
      name: user.name,
      img: user.url_img,
      id_role: user.id_role,
      role: user.id_role == 1 ? 'admin' : user.id_role == 2 ? 'penghuni' : 'pemilik'
    }

  }

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body>

        <ThemeRegistry options={{ key: 'mui' }}>
          {
            session ? <Navbar session={user} /> :
              <Navbar />
          }
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
