import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function searchUser(usrEmail: string) {
    return await prisma.user.findFirst({
        where: {
            email: usrEmail
        }
    })
}

async function readUsers() {
    return await prisma.user.findMany();
}

async function createUser() {
    console.log('creating new user!');
    const user = {
        name: "Emilio",
        email: "emilio@email.com"
    };
    return await prisma.user.create({data: user})
}

async function main() {
    const usrs = await readUsers();
    console.log(usrs);

    const usr = await searchUser("emilio@email.com");
    console.log(usr);
    if (usr == null) {
        console.log('creating user...')
        await createUser();
    }

    const usrs2 = await readUsers();
    console.log(usrs2);
}

main();