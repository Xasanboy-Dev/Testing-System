import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function findAllTests() {
  return prisma.test.findMany({
    include: {
      answers: true,
    },
  });
}

export function findOneTest({ id }: { id: number }) {
  return prisma.test.findUnique({
    where: {
      id,
    },
    include: {
      answers: true,
    },
  });
}

export function addTest({ text }: { text: string }) {
  return prisma.test.create({
    data: {
      text,
    },
  });
}

export function editTest({ id, text }: { id: number; text: string }) {
  return prisma.test.update({
    data: {
      text,
    },
    where: {
      id,
    },
  });
}

export function removeTest({ id }: { id: number }) {
  return prisma.test.delete({
    where: { id },
  });
}
