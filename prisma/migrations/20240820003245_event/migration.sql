/*
  Warnings:

  - You are about to drop the column `organizer_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `creator_id` on the `Memory` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Memory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "organizer_id";

-- AlterTable
ALTER TABLE "Memory" DROP COLUMN "creator_id",
DROP COLUMN "likes";
