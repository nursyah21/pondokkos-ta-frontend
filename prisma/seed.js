// import { PrismaClient } from "@prisma/client";
// import { hash } from "bcryptjs";
const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcrypt')
// const prisma = new PrismaClient()

const prisma = new PrismaClient();

async function main(){
    const password = await hash("password123", 12)
    // const user = await prisma.users.upsert({
    //     where: {email: "admin@mail.com"},
    //     update: {},
    //     create: {
    //         email: "admin@mail.com",
    //         name: "admin",
    //         password,
    //         id_role: 1
    //     }
    // })
    const user1 = await prisma.users.create({
      // where: {email: "admin@mail.com"},
      // update: {},
      data: {
          email: "admin1@mail.com",
          name: "admin1",
          password,
          id_role: 1
      }
  })
    
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });