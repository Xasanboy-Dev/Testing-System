import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function getAllAnswers() {
  return prisma.answers.findMany({
    include: {
      test: true,
    },
  });
}

export function getOneAnswer({ id }: { id: number }) {
  return prisma.answers.findUnique({
    where: {
      id,
    },
    include: {
      test: true,
    },
  });
}
export function addAnswer({ testId, text }: { text: string; testId: number }) {
  return prisma.answers.create({
    data: {
      text,
      testId,
    },
  });
}
export function editAnswer({
  id,
  testId,
  text,
}: {
  id: number;
  text: string;
  testId: number;
}) {
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
export function deleteAnswer({ id }: { id: number }) {
  return prisma.answers.delete({
    where: {
      id,
    },
  });
}
