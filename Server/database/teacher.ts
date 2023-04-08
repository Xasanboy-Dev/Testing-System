import { PrismaClient, Pupil } from "@prisma/client";
const prisma = new PrismaClient()

export async function findAllAdmins() {
    return prisma.teacher.findMany({
        include: {
            pupils: true,
            school: true
        }
    })
}

export async function findAdminById({ id }: { id: number }) {
    return prisma.teacher.findUnique({
        where: {
            id
        },
        include: {
            pupils: true,
            school: true
        }
    })
}

export async function addTeacher({ adddress,
    lastname,
    name,
    bio,
    schoolId
}: {
    adddress: string,
    lastname: string,
    name: string,
    bio: string | undefined,
    schoolId: number
}) {
    return prisma.teacher.create({
        data: {
            adddress,
            lastname,
            name,
            bio,
            schoolId
        }
    })
}

export async function editteacher({ adddress,
    lastname,
    name,
    bio,
    schoolId,
    id
}: {
    adddress: string,
    lastname: string,
    name: string,
    bio: string | undefined,
    schoolId: number,
    id: number
}) {
    return await prisma.teacher.update({
        data: {
            adddress,
            bio,
            lastname,
            name,
            schoolId
        },
        where: {
            id
        }
    })
}

export async function removeTeacher({ id }: { id: number }) {
    return await prisma.teacher.delete({ where: { id } })
}