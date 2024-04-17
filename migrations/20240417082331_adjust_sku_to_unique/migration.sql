/*
  Warnings:

  - A unique constraint covering the columns `[Sku]` on the table `Variant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Variant_Sku_key" ON "Variant"("Sku");
