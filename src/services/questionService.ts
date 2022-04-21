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

async function findOneQuestion(id: number) {
  return questionRepository.findOne(id);
}

async function findAllQuestions() {
  return questionRepository.findAll();
}

export default {
  createQuestionAndTags,
  createNewAnswer,
  findOneQuestion,
  findAllQuestions,
};
