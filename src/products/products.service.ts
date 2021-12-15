import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginationRequest } from '../pagination/dto/pagination-request.dto';
import { ProductDto } from './dto/product-dto';
import { PaginationResponse } from '../pagination/dto/pagination-response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { id } = createProductDto;

    if (await this.prisma.product.count({ where: { id } })) {
      throw new HttpException('id already used', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.product.create({ data: createProductDto });
  }

  async findAll(
    paginationRequest: PaginationRequest,
  ): Promise<PaginationResponse<ProductDto>> {
    const PER_PAGE = paginationRequest.perPage || 100;
    const PAGE = paginationRequest.page || 1;

    const result = await this.prisma.product.findMany({
      take: PER_PAGE,
      skip: (PER_PAGE - 1) * PAGE,
      where: {
        stock: {
          gt: 0,
        },
      }, //products with positive stock
    });

    return {
      results: result.length,
      page: PAGE,
      data: plainToClass(ProductDto, result),
    };
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      data: updateProductDto,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
