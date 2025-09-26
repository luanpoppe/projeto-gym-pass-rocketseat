-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "public"."check_ins" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'MEMBER';
