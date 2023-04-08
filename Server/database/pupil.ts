import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function findPupils() {
  return prisma.pupil.findMany({
    include: {
      school: true,
      teacher: true,
    },
  });
}

export async function findOnePupil(id: number) {
  return prisma.pupil.findUnique({
    where: {
      id,
    },
    include: {
      school: true,
      teacher: true,
    },
  });
}

export async function addPupil(
  name: string,
  lastname: string,
  phoneNumber: string,
  address: string,
  bio: string,
  currentClass: string,
  teacherId: number,
  schoolId: number,
  password: string
) {
  return prisma.pupil.create({
    data: {
      lastname,
      name,
      phoneNumber,
      address,
      bio,
      currentClass,
      schoolId,
      password,
      teacherId,
    },
  });
}

export async function editPupil(
  id: number,
  name: string,
  lastname: string,
  phoneNumber: string,
  address: string,
  bio: string,
  currentClass: string,
  password: string
) {
  return prisma.pupil.update({
    where: {
      id,
    },
    data: {
      address,
      bio,
      currentClass,
      lastname,
      name,
      phoneNumber,
      password,
    },
  });
}

export async function deletePupil(id: number) {
  return await prisma.pupil.delete({
    where: {
      id,
    },
  });
}
