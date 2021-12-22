import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartItemsModule } from './cart-items/cart-items.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    ProductsModule,
    CategoriesModule,
    CartItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
