/*
  Warnings:

  - Added the required column `nft_token_id` to the `apis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apis" ADD COLUMN     "nft_token_id" INTEGER NOT NULL;
