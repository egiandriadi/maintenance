-- AlterTable
ALTER TABLE "status_maintenance" ADD COLUMN     "next_status_maintenance_id" INTEGER,
ADD COLUMN     "sla_in_hours" INTEGER;
