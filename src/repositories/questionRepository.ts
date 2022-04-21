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

export default { create, findById };
