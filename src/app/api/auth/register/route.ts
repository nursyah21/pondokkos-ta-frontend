// import prisma from "@/app/lib/prisma";
import prisma from "@/../lib/prisma"
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password, name, id_role } = await req.json();  
  const exists = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    try {
        const user = await prisma.users.create({
          data: {
            email,
            password: await hash(password, 10),
            name,
            id_role
          },
        });
        return NextResponse.json(user);
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'gagal menambahkan user'});
    }
  }

}