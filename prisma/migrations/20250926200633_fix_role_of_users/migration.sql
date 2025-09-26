/*
  Warnings:

  - You are about to drop the column `role` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."check_ins" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'MEMBER';
