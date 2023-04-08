import { PrismaClient, Pupil } from "@prisma/client";
const prisma = new PrismaClient();

export async function findAllAdmins() {
  return prisma.teacher.findMany({
    include: {
      pupils: true,
      school: true,
    },
  });
}

export async function findteacherById(id: number) {
  return prisma.teacher.findUnique({
    where: {
      id,
    },
    include: {
      pupils: true,
      school: true,
    },
  });
}

export async function addTeacher(
  adddress: string,
  lastname: string,
  name: string,
  bio: string,
  schoolId: number,
  password: string,
  phoneNumber: string
) {
  return prisma.teacher.create({
    data: {
      adddress,
      lastname,
      name,
      bio,
      schoolId,
      password,
      phoneNumber,
    },
  });
}

export async function editteacher(
  adddress: string,
  lastname: string,
  name: string,
  bio: string,
  schoolId: number,
  id: number,
  password: string,
  phoneNumber: string
) {
  return await prisma.teacher.update({
    data: {
      adddress,
      bio,
      lastname,
      name,
      schoolId,
      password,
    },
    where: {
      id,
    },
  });
}

export async function removeTeacher(id: number) {
  return await prisma.teacher.delete({ where: { id } });
}
