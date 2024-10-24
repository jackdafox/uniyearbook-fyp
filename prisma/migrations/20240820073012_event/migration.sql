/*
  Warnings:

  - You are about to drop the `EventImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventImage" DROP CONSTRAINT "EventImage_eventId_fkey";

-- DropTable
DROP TABLE "EventImage";
