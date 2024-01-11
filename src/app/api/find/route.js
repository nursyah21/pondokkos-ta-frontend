import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import getUserData from '@/app/lib/getUserData'
import { NextResponse } from "next/server";


async function getUsersPag(page, take) {

    const users = await prisma.users.findMany({
        skip: (page - 1) * take,
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
    // const session = await getServerSession(authOptions);
    const { nextUrl } = request
    // let data = null
    let take = parseInt(nextUrl.searchParams.get('take'))
    let page = parseInt(nextUrl.searchParams.get('page'))
    let q = nextUrl.searchParams.get('q')
    if(q){
        let res = await prisma.kos.findMany({
            where: {
                name_kos: {
                    contains: q
                }
            }
        })
        return NextResponse.json(res)
    }
    if (!take) take = 10
    if (!page) page = 1

    let res = await prisma.kos.findMany({
        skip: (page - 1) * take,
        take: take
    })

    const hasMore = res.length === take;
    const nextCursor = hasMore ? res[res.length - 1].id : null;

    return NextResponse.json({res, hasMore, nextCursor})
    
}

export async function POST(request) {
    const session = await getServerSession(authOptions);
    const { nextUrl } = request
    let data = null
    if (session?.user) {
        let take = parseInt(nextUrl.searchParams.get('take'))
        let page = parseInt(nextUrl.searchParams.get('page'))
        if (!take) take = 10
        if (!page) page = 1

        data = await getUserData(session.user?.email)

        if (data.id_role == 2) return NextResponse.json({ error: '404 unathorized' })

        try {
            const dataKos = await request.json();
            const kos = await prisma.kos.create({
                data: dataKos
            });
            return NextResponse.json(kos);
        } catch (error) {
            console.log(error)
            return NextResponse.json({ error: 'gagal menambahkan user' });
        }
    }

    return NextResponse.json({ error: '404 unathorized' })

}
