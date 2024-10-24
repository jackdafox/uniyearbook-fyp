/*
  Warnings:

  - You are about to drop the column `student_id` on the `Memory` table. All the data in the column will be lost.
  - Added the required column `batch_id` to the `Memory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Memory" DROP CONSTRAINT "Memory_student_id_fkey";

-- AlterTable
ALTER TABLE "Memory" DROP COLUMN "student_id",
ADD COLUMN     "batch_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
