


import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import prisma from "@/../lib/prisma";
import Home from '@/app/components/ui/Home'


async function getUserData(email) {
  const exists = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  return exists
}

export default async function page() {
  const session = await getServerSession(authOptions);
  let user = null

  if(session){
    user = await getUserData(session.user?.email)
    console.log(user)
  }
  console.log(session)

  return (
    <> 
      <Home session={user} />
    </>
  )
}

