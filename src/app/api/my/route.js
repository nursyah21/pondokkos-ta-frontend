import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
// import getUserData from '@/app/lib/getUserData'

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
    let data = null
    if (session?.user) {
        data = await getUserData(session.user?.email)
        return NextResponse.json(data)
    }

    return NextResponse.json({ error: '404 unathorized' })
}


export async function POST(request) {
    const session = await getServerSession(authOptions);
    let data = null
    if (session?.user) {
        data = await getUserData(session.user?.email)
        let body = await request.json()
        
        let res = await prisma.users.update({
            where: {
                id: body.id
            },
            data: body
        })
        
        return NextResponse.json({ success: 'success' })
    }

    return NextResponse.json({ error: '404 unathorized' })
}
