/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `student_id` to the `Memory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_memoryId_fkey";

-- AlterTable
ALTER TABLE "Memory" ADD COLUMN     "student_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Comment";

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
