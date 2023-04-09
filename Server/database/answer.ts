import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function findAllAnswers() {
  return prisma.answers.findMany({
    include: {
      test: true,
    },
  });
}

export function getOneAnswer(id: number) {
  return prisma.answers.findUnique({
    where: {
      id,
    },
    include: {
      test: true,
    },
  });
}
export function addAnswer(text: string, testId: number, ownerID: number) {
  return prisma.answers.create({
    data: {
      text,
      testId,
      ownerId: ownerID,
    },
  });
}
export function editAnswer(id: number, text: string, testId: number) {
  return prisma.answers.update({
    data: {
      text,
      testId,
    },
    where: {
      id,
    },
  });
}
export function deleteAnswer(id: number) {
  return prisma.answers.delete({
    where: {
      id,
    },
  });
}
