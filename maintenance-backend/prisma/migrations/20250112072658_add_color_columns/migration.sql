/*
  Warnings:

  - Added the required column `color` to the `status_maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `urgency_maintenance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "status_maintenance" ADD COLUMN     "color" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "urgency_maintenance" ADD COLUMN     "color" TEXT NOT NULL;
