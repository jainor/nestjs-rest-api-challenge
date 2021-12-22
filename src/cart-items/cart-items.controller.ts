import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator';
import { PublicUserDto } from '../users/dto/public-user.dto';

@Controller('cart/items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Body() createCartItemDto: CreateCartItemDto,
    @GetUser() user: PublicUserDto,
  ) {
    console.log(createCartItemDto);
    return this.cartItemsService.create(user.id, createCartItemDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@GetUser() user: PublicUserDto) {
    return this.cartItemsService.findAllByCart(user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@GetUser() user: PublicUserDto, @Param('id') id: string) {
    return this.cartItemsService.findOne(user.id, +id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemsService.update(+id, updateCartItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemsService.remove(+id);
  }
}
