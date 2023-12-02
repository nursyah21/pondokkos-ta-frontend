// import { PrismaClient } from "@prisma/client";
// import { hash } from "bcryptjs";
const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')
// const prisma = new PrismaClient()

const prisma = new PrismaClient();

async function main(){
    const password = await hash("password123", 12)
    const user = await prisma.user.upsert({
        where: {email: "admin@mail,com"},
        update: {},
        create: {
            email: "admin@mail.com",
            name: "admin",
            password
        }
    })
    console.log({user})
}

// console.log('asdsa')
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });