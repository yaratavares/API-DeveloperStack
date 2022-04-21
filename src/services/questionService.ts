import questionRepository from "../repositories/questionRepository.js";
import answerRepository from "../repositories/answerRepository.js";
import errors from "../utils/errorUtils.js";

async function createQuestionAndTags(
  userId: number,
  question: string,
  tags: string[]
) {
  //tags.map(async (tag: string) => {
  await questionRepository.create({ question, userId }, tags[0]);
  //});
}

async function createNewAnswer(
  questionId: number,
  userId: number,
  answer: string
) {
  const questionExist = await questionRepository.findById(questionId);

  if (!questionExist) {
    throw errors.notFound();
  }

  const answerExist = await answerRepository.findByQuestion(questionId);

  if (answerExist) {
    throw errors.conflict();
  }

  await answerRepository.create({ questionId, userId, answer });
}

export default { createQuestionAndTags, createNewAnswer };
