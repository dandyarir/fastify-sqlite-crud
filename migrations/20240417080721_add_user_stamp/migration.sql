-- AlterTable
ALTER TABLE "Catalog" ADD COLUMN "created_at" DATETIME;
ALTER TABLE "Catalog" ADD COLUMN "created_by" TEXT;
ALTER TABLE "Catalog" ADD COLUMN "updated_at" DATETIME;
ALTER TABLE "Catalog" ADD COLUMN "updated_by" TEXT;

-- AlterTable
ALTER TABLE "Variant" ADD COLUMN "created_at" DATETIME;
ALTER TABLE "Variant" ADD COLUMN "created_by" TEXT;
ALTER TABLE "Variant" ADD COLUMN "updated_at" DATETIME;
ALTER TABLE "Variant" ADD COLUMN "updated_by" TEXT;
