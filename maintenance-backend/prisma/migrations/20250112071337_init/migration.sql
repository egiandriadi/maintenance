-- CreateTable
CREATE TABLE "urgency_maintenance" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_by" TEXT,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "urgency_maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_maintenance" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_by" TEXT,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "status_maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_request" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status_maintenance_id" INTEGER NOT NULL,
    "urgency_maintenance_id" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_by" TEXT,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "maintenance_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urgency_maintenance_uuid_key" ON "urgency_maintenance"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "status_maintenance_uuid_key" ON "status_maintenance"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "maintenance_request_uuid_key" ON "maintenance_request"("uuid");

-- AddForeignKey
ALTER TABLE "maintenance_request" ADD CONSTRAINT "maintenance_request_status_maintenance_id_fkey" FOREIGN KEY ("status_maintenance_id") REFERENCES "status_maintenance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_request" ADD CONSTRAINT "maintenance_request_urgency_maintenance_id_fkey" FOREIGN KEY ("urgency_maintenance_id") REFERENCES "urgency_maintenance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
