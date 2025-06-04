/*
  Warnings:

  - You are about to drop the column `role_id` on the `permissions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[routePattern,method]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_role_id_fkey";

-- DropIndex
DROP INDEX "permissions_routePattern_method_role_id_key";

-- DropIndex
DROP INDEX "permissions_routePattern_role_id_idx";

-- DropIndex
DROP INDEX "roles_isAdmin_key";

-- DropIndex
DROP INDEX "roles_isDefault_key";

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "role_id";

-- CreateTable
CREATE TABLE "roles_on_permissions" (
    "id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "roles_on_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_on_permissions_role_id_permission_id_key" ON "roles_on_permissions"("role_id", "permission_id");

-- CreateIndex
CREATE INDEX "permissions_routePattern_method_idx" ON "permissions"("routePattern", "method");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_routePattern_method_key" ON "permissions"("routePattern", "method");

-- AddForeignKey
ALTER TABLE "roles_on_permissions" ADD CONSTRAINT "roles_on_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_on_permissions" ADD CONSTRAINT "roles_on_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
