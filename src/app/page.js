


import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
// import { useRouter } from 'next/router';
import prisma from "@/../lib/prisma";
import Home from '@/app/components/Home'
// import { useRouter } from "next/navigation";
// type Home = {
//   session?: any
// }

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
  // const router = useRouter();
  // {console.log(session)}
  if(session){
    user = await getUserData(session.user?.email)
    // console.log(user)z
  }

  return (
    <>
    {/* {session && redirect('/dashboard')//NextResponse.redirect(new URL('http://localhost:3000/dashboard'))
    } */}
    
      <Home session={user} />
       {/* {!session && (
        <ul>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>
      )}
      {session && (
        <p>Welcome, {session.user.name}</p>
      )} */}
    </>
  )
}

