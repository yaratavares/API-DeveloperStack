import { Question } from "@prisma/client";
import client from "../database.js";

type DataQuestion = Omit<Question, "id">;

async function create(dataQuestion: DataQuestion, tag: string) {
  await client.tagsQuestions.create({
    data: {
      question: {
        create: {
          question: dataQuestion.question,
          userId: dataQuestion.userId,
        },
      },
      tag: {
        create: { name: tag },
      },
    },
  });
}

function findById(id: number) {
  return client.question.findFirst({ where: { id } });
}

function findOne(id: number) {
  return client.question.findUnique({
    select: {
      id: true,
      question: true,
      user: {
        select: {
          email: true,
        },
      },
      answers: {
        select: {
          answer: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    where: {
      id,
    },
  });
}

function findAll() {
  return client.question.findMany({
    select: {
      id: true,
      question: true,
      user: {
        select: {
          email: true,
        },
      },
      answers: {
        select: {
          answer: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
        },
      },
    },
  });
}

export default { create, findById, findOne, findAll };
