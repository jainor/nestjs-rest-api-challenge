/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `shopping_cart_items` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "shopping_cart_items" ALTER COLUMN "amount" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "shopping_cart_items_product_id_key" ON "shopping_cart_items"("product_id");
