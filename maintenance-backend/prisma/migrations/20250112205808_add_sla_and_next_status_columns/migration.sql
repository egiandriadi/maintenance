/*
  Warnings:

  - You are about to drop the column `next_status_maintenance_id` on the `status_maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `sla_in_hours` on the `status_maintenance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "status_maintenance" DROP COLUMN "next_status_maintenance_id",
DROP COLUMN "sla_in_hours";

-- AlterTable
ALTER TABLE "urgency_maintenance" ADD COLUMN     "next_status_maintenance_id" INTEGER,
ADD COLUMN     "sla_in_hours" INTEGER;
