/*
  Warnings:

  - Added the required column `category` to the `Memory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Memory" ADD COLUMN     "category" TEXT NOT NULL;
