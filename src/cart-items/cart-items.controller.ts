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
import { GetUser } from '../users/decorators/get-user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart/items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @ApiOAuth2([])
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Body() createCartItemDto: CreateCartItemDto,
    @GetUser() user: UserDto,
  ) {
    console.log(createCartItemDto);
    return this.cartItemsService.create(user.id, createCartItemDto);
  }

  @Get()
  @ApiOAuth2([])
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@GetUser() user: UserDto) {
    return this.cartItemsService.findAllByCart(user.id);
  }

  @Get(':id')
  @ApiOAuth2([])
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@GetUser() user: UserDto, @Param('id') id: string) {
    return this.cartItemsService.findOne(user.id, +id);
  }

  @Patch(':id')
  @ApiOAuth2([])
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
