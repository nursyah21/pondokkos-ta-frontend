
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
// import { NextResponse } from "next/server";
// import { notFound } from "next/navigation";
import Notfound from '@/app/not-found'

async function getUserData(email) {
  const exists = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  return exists
}

const PAGE_SIZE = 10;
async function getUsers(page, cursor) {
  const skip = (page - 1) * PAGE_SIZE;
  const take = PAGE_SIZE;

  const where = cursor ? { id: { gt: cursor } } : {};

  const users = await prisma.users.findMany({
    where,
    skip,
    take,
    orderBy: [{ id: 'asc' }],
  });

  const hasMore = users.length === PAGE_SIZE;
  const nextCursor = hasMore ? users[users.length - 1].id : null;

  return { users, hasMore, nextCursor };
}


export default async function RootLayout({ children }) {
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
    <>
      {session ?
        children : <Notfound />}
    </>
    
  )
}
