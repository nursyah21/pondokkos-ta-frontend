import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import getUserData from '@/app/lib/getUserData'
import { NextResponse } from "next/server";


async function getUsersPag(page, take) {

    const users = await prisma.users.findMany({
        skip: (page-1)*take,
        take: take
    });
    
    const hasMore = users.length === take;
    const nextCursor = hasMore ? users[users.length - 1].id : null;
  
    return { users, hasMore, nextCursor };
}


async function getUserData(email) {
    const exists = await prisma.users.findFirst({
        where: {
            email,
        },
    });
    return exists
}

export async function GET(request) {
    const session = await getServerSession(authOptions);
    const { nextUrl } = request
    let data = null
    if (session?.user) {
        let take = parseInt(nextUrl.searchParams.get('take')) 
        let page = parseInt(nextUrl.searchParams.get('page'))
        if(!take) take = 10
        if(!page) page = 1

        data = await getUserData(session.user?.email)
        if (data.id_role != 1) return NextResponse.json({ error: '404 unathorized' })
        // console.log('-', page, take)
        data = await getUsersPag(page,take)
        // console.log(request)
        return NextResponse.json(data)
        data = await getUsers(1, 0)

        return NextResponse.json(data.users)
    }

    return NextResponse.json({ error: '404 unathorized' })

}
