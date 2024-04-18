-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Variant_CatalogId_fkey" FOREIGN KEY ("CatalogId") REFERENCES "Catalog" ("CatalogId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Variant" ("CatalogId", "CreatedAt", "CreatedBy", "Name", "Price", "Sku", "UpdatedAt", "UpdatedBy", "VariantId") SELECT "CatalogId", "CreatedAt", "CreatedBy", "Name", "Price", "Sku", "UpdatedAt", "UpdatedBy", "VariantId" FROM "Variant";
DROP TABLE "Variant";
ALTER TABLE "new_Variant" RENAME TO "Variant";
CREATE UNIQUE INDEX "Variant_Sku_key" ON "Variant"("Sku");
CREATE TABLE "new_Catalog" (
    "CatalogId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "CreatedBy" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL,
    "UpdatedAt" DATETIME,
    "UpdatedBy" TEXT,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Catalog" ("CatalogId", "CreatedAt", "CreatedBy", "Description", "Name", "UpdatedAt", "UpdatedBy") SELECT "CatalogId", "CreatedAt", "CreatedBy", "Description", "Name", "UpdatedAt", "UpdatedBy" FROM "Catalog";
DROP TABLE "Catalog";
ALTER TABLE "new_Catalog" RENAME TO "Catalog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
