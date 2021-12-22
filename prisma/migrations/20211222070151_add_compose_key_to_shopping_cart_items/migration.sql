-- Create compose key

ALTER TABLE "shopping_cart_items" ADD UNIQUE ("cart_id", "product_id");