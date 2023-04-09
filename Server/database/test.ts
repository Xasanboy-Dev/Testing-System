import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function findAllTests() {
  return prisma.test.findMany({
    include: {
      answers: true,
    },
  });
}

export function findOneTest(id: number) {
  return prisma.test.findUnique({
    where: {
      id,
    },
    include: {
      answers: true,
    },
  });
}

export function addTest(text: string, ownerID: number) {
  return prisma.test.create({
    data: {
      text,
      ownerId: ownerID,
    },
  });
}

export function editTest(id: number, text: string) {
  return prisma.test.update({
    data: {
      text,
    },
    where: {
      id,
    },
  });
}

export function removeTest(id: number) {
  return prisma.test.delete({
    where: { id },
  });
}
