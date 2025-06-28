/*
  Warnings:

  - You are about to drop the column `api_id` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `users` table. All the data in the column will be lost.
  - Added the required column `specialty` to the `apis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `useCases` to the `apis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agent_id` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterprise` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_api_id_fkey";

-- AlterTable
ALTER TABLE "apis" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "specialty" TEXT NOT NULL,
ADD COLUMN     "useCases" TEXT NOT NULL,
ALTER COLUMN "endpoint" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "api_id",
ADD COLUMN     "agent_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "senha",
ADD COLUMN     "enterprise" VARCHAR(255) NOT NULL,
ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ADD COLUMN     "role" VARCHAR(255) NOT NULL,
ADD COLUMN     "sector" VARCHAR(255) NOT NULL,
ADD COLUMN     "telephone" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "apis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
