import { Answer } from "@prisma/client";
import client from "../database.js";

function create(dataAnswer: Answer) {
  return client.answer.create({
    data: dataAnswer,
  });
}

function findByQuestion(questionId: number) {
  return client.answer.findFirst({
    where: {
      questionId,
    },
  });
}

export default { create, findByQuestion };
