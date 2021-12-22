import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CartItemsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createCartItemDto: CreateCartItemDto) {
    const cartId = userId;
    const { id } = createCartItemDto;

    if (await this.prisma.shoppingCartItem.count({ where: { id } })) {
      throw new HttpException('id already used', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.shoppingCartItem.create({
      data: {
        ...createCartItemDto,
        cartId,
      },
    });
  }

  findAllByCart(userId: number) {
    const cartId = userId;
    return this.prisma.shoppingCartItem.findMany({
      where: { cartId },
    });
  }

  async findOne(userId: number, id: number) {
    const cartId = userId;
    const data = await this.prisma.shoppingCartItem.findUnique({
      where: { id },
    });
    if (data.cartId != cartId) {
      throw new HttpException(
        'cart does not belong to current user',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return data;
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return this.prisma.shoppingCartItem.update({
      data: updateCartItemDto,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
