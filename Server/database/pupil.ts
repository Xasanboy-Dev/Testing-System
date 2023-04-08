import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function findPupils() {
    return prisma.pupil.findMany({
        include: {
            school: true,
            teacher: true
        }
    })
}

export async function findOnePupil({ id }: { id: number }) {
    return prisma.pupil.findUnique({
        where: {
            id
        },
        include: {
            school: true,
            teacher: true
        }
    })
}

export async function addPupil({ lastname, name, phoneNumber, address, bio, currentClass, schoolId, teacherId }:
    {
        name: string, lastname: string, phoneNumber: string, address: string, bio: string | undefined,
        currentClass: string, teacherId: number, schoolId: number
    }) {
    return prisma.pupil.create({
        data: {
            lastname,
            name,
            phoneNumber,
            address,
            bio,
            currentClass,
            schoolId,
            teacherId
        }
    })
}

export async function editPupil({ id, lastname, name, phoneNumber, address, bio, currentClass }:
    { id: number, name: string, lastname: string, phoneNumber: string, address: string, bio: string | undefined, currentClass: string }) {
    return prisma.pupil.update({
        where: {
            id
        },
        data: {
            address,
            bio,
            currentClass,
            lastname,
            name,
            phoneNumber,
        }
    })
}

export async function deletePupil({ id }: { id: number }) {
    return await prisma.pupil.delete(
        {
            where: {
                id
            }
        }
    )
}