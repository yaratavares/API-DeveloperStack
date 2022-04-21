/*
  Warnings:

  - The primary key for the `answers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `answers` table. All the data in the column will be lost.
  - The primary key for the `tagsQuestions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tagsQuestions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "answers" DROP CONSTRAINT "answers_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "answers_pkey" PRIMARY KEY ("questionId", "userId");

-- AlterTable
ALTER TABLE "tagsQuestions" DROP CONSTRAINT "tagsQuestions_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "tagsQuestions_pkey" PRIMARY KEY ("tagId", "questionId");
