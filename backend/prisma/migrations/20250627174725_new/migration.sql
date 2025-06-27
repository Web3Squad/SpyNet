/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `wallet_address` on the `users` table. All the data in the column will be lost.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[address]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `creator_id` on the `apis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `contracts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "apis" DROP CONSTRAINT "apis_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_user_id_fkey";

-- DropIndex
DROP INDEX "users_wallet_address_key";

-- AlterTable
ALTER TABLE "apis" DROP COLUMN "creator_id",
ADD COLUMN     "creator_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "wallet_address",
ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "senha" VARCHAR(255) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_address_key" ON "users"("address");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "apis" ADD CONSTRAINT "apis_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
