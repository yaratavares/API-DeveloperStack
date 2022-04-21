import { Question } from "@prisma/client";
import client from "../database.js";

type DataQuestion = Omit<Question, "id">;

async function create(dataQuestion: DataQuestion, tag: string) {
  const { id: idQ } = await client.question.create({ data: dataQuestion });

  const { id: idT } = await client.tags.create({ data: { name: tag } });

  await client.tagsQuestions.create({ data: { questionId: idQ, tagId: idT } });
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
    },
  });
}

export default { create, findById, findOne, findAll };
