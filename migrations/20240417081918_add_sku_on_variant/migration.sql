/*
  Warnings:

  - Added the required column `Sku` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Variant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Price" REAL NOT NULL,
    "Sku" TEXT NOT NULL,
    "CatalogId" INTEGER NOT NULL,
    "CreatedBy" TEXT,
    "CreatedAt" DATETIME,
    "UpdatedAt" DATETIME,
    "UpdatedBy" TEXT,
    CONSTRAINT "Variant_CatalogId_fkey" FOREIGN KEY ("CatalogId") REFERENCES "Catalog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Variant" ("CatalogId", "CreatedAt", "CreatedBy", "Name", "Price", "UpdatedAt", "UpdatedBy", "id") SELECT "CatalogId", "CreatedAt", "CreatedBy", "Name", "Price", "UpdatedAt", "UpdatedBy", "id" FROM "Variant";
DROP TABLE "Variant";
ALTER TABLE "new_Variant" RENAME TO "Variant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
