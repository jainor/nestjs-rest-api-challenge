import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../users/decorators/rol.decorator';
import { RolesGuard } from '../users/decorators/rol.guard';
import { PaginationRequest } from 'src/Pagination/dto/pagination-request.dto';
import { ProductDto } from './dto/product-dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard())
  @Roles('admin', 'manager')
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() paginationRequest: PaginationRequest) {
    return this.productsService.findAll(paginationRequest);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @Roles('admin', 'manager')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @Roles('admin', 'manager')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
