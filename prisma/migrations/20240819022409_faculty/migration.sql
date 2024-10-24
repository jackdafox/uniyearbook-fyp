/*
  Warnings:

  - The primary key for the `Batch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `batch_id` on the `Batch` table. All the data in the column will be lost.
  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `comment_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `memory_id` on the `Comment` table. All the data in the column will be lost.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_id` on the `Event` table. All the data in the column will be lost.
  - The primary key for the `EventImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_id` on the `EventImage` table. All the data in the column will be lost.
  - You are about to drop the column `image_id` on the `EventImage` table. All the data in the column will be lost.
  - The primary key for the `Faculty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `faculty_id` on the `Faculty` table. All the data in the column will be lost.
  - The primary key for the `Major` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `major_id` on the `Major` table. All the data in the column will be lost.
  - The primary key for the `Memory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `memory_id` on the `Memory` table. All the data in the column will be lost.
  - The primary key for the `MemoryImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image_id` on the `MemoryImage` table. All the data in the column will be lost.
  - You are about to drop the column `memory_id` on the `MemoryImage` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `faculty_id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `major_id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `MajorBatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FacultyBatches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MajorBatches` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `facultyId` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `majorId` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memoryId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `EventImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memoryId` to the `MemoryImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_memory_id_fkey";

-- DropForeignKey
ALTER TABLE "EventImage" DROP CONSTRAINT "EventImage_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Major" DROP CONSTRAINT "Major_faculty_id_fkey";

-- DropForeignKey
ALTER TABLE "MajorBatch" DROP CONSTRAINT "MajorBatch_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "MajorBatch" DROP CONSTRAINT "MajorBatch_major_id_fkey";

-- DropForeignKey
ALTER TABLE "MemoryImage" DROP CONSTRAINT "MemoryImage_memory_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_faculty_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_major_id_fkey";

-- DropForeignKey
ALTER TABLE "_FacultyBatches" DROP CONSTRAINT "_FacultyBatches_A_fkey";

-- DropForeignKey
ALTER TABLE "_FacultyBatches" DROP CONSTRAINT "_FacultyBatches_B_fkey";

-- DropForeignKey
ALTER TABLE "_MajorBatches" DROP CONSTRAINT "_MajorBatches_A_fkey";

-- DropForeignKey
ALTER TABLE "_MajorBatches" DROP CONSTRAINT "_MajorBatches_B_fkey";

-- AlterTable
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_pkey",
DROP COLUMN "batch_id",
ADD COLUMN     "facultyId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "majorId" INTEGER NOT NULL,
ADD CONSTRAINT "Batch_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
DROP COLUMN "comment_id",
DROP COLUMN "memory_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "memoryId" INTEGER NOT NULL,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "event_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EventImage" DROP CONSTRAINT "EventImage_pkey",
DROP COLUMN "event_id",
DROP COLUMN "image_id",
ADD COLUMN     "eventId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "EventImage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_pkey",
DROP COLUMN "faculty_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Major" DROP CONSTRAINT "Major_pkey",
DROP COLUMN "major_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Major_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Memory" DROP CONSTRAINT "Memory_pkey",
DROP COLUMN "memory_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Memory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MemoryImage" DROP CONSTRAINT "MemoryImage_pkey",
DROP COLUMN "image_id",
DROP COLUMN "memory_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "memoryId" INTEGER NOT NULL,
ADD CONSTRAINT "MemoryImage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "faculty_id",
DROP COLUMN "major_id",
DROP COLUMN "student_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "MajorBatch";

-- DropTable
DROP TABLE "_FacultyBatches";

-- DropTable
DROP TABLE "_MajorBatches";

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "Memory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryImage" ADD CONSTRAINT "MemoryImage_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "Memory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventImage" ADD CONSTRAINT "EventImage_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
