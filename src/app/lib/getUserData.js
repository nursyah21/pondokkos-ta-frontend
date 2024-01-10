async function getUserData(email) {
    const exists = await prisma.users.findFirst({
        where: {
            email,
        },
    });
    return exists
}