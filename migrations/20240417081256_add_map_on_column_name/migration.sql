/*
  Warnings:

  - You are about to drop the column `catalogId` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Catalog` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `Catalog` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Catalog` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Catalog` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Catalog` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `Catalog` table. All the data in the column will be lost.
  - Added the required column `CatalogId` to the `Variant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Variant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Price` to the `Variant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `Catalog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedBy` to the `Catalog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Catalog` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Variant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Price" REAL NOT NULL,
    "CatalogId" INTEGER NOT NULL,
    "CreatedBy" TEXT,
    "CreatedAt" DATETIME,
    "UpdatedAt" DATETIME,
    "UpdatedBy" TEXT,
    CONSTRAINT "Variant_CatalogId_fkey" FOREIGN KEY ("CatalogId") REFERENCES "Catalog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Variant" ("id") SELECT "id" FROM "Variant";
DROP TABLE "Variant";
ALTER TABLE "new_Variant" RENAME TO "Variant";
CREATE TABLE "new_Catalog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "CreatedBy" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL,
    "UpdatedAt" DATETIME,
    "UpdatedBy" TEXT
);
INSERT INTO "new_Catalog" ("id") SELECT "id" FROM "Catalog";
DROP TABLE "Catalog";
ALTER TABLE "new_Catalog" RENAME TO "Catalog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
