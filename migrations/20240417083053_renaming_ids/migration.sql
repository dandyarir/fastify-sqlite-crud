/*
  Warnings:

  - The primary key for the `Catalog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Catalog` table. All the data in the column will be lost.
  - The primary key for the `Variant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Variant` table. All the data in the column will be lost.
  - Added the required column `CatalogId` to the `Catalog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VariantId` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Catalog" (
    "CatalogId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "CreatedBy" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL,
    "UpdatedAt" DATETIME,
    "UpdatedBy" TEXT
);
INSERT INTO "new_Catalog" ("CreatedAt", "CreatedBy", "Description", "Name", "UpdatedAt", "UpdatedBy") SELECT "CreatedAt", "CreatedBy", "Description", "Name", "UpdatedAt", "UpdatedBy" FROM "Catalog";
DROP TABLE "Catalog";
ALTER TABLE "new_Catalog" RENAME TO "Catalog";
CREATE TABLE "new_Variant" (
    "VariantId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Price" REAL NOT NULL,
    "Sku" TEXT NOT NULL,
    "CatalogId" INTEGER NOT NULL,
    "CreatedBy" TEXT,
    "CreatedAt" DATETIME,
    "UpdatedAt" DATETIME,
    "UpdatedBy" TEXT,
    CONSTRAINT "Variant_CatalogId_fkey" FOREIGN KEY ("CatalogId") REFERENCES "Catalog" ("CatalogId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Variant" ("CatalogId", "CreatedAt", "CreatedBy", "Name", "Price", "Sku", "UpdatedAt", "UpdatedBy") SELECT "CatalogId", "CreatedAt", "CreatedBy", "Name", "Price", "Sku", "UpdatedAt", "UpdatedBy" FROM "Variant";
DROP TABLE "Variant";
ALTER TABLE "new_Variant" RENAME TO "Variant";
CREATE UNIQUE INDEX "Variant_Sku_key" ON "Variant"("Sku");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
