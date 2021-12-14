import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, PrismaModule, ProductsModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
