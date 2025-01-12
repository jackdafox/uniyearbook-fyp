-- DropForeignKey
ALTER TABLE "Socials" DROP CONSTRAINT "Socials_userId_fkey";

-- AddForeignKey
ALTER TABLE "Socials" ADD CONSTRAINT "Socials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
