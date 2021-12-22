import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { CredentialsUserDto } from './dto/credentials-user.dto';
import { PublicUserDto } from './dto/public-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.usersService.findAll();
  }
  @Post('signin')
  @UsePipes(new ValidationPipe({ transform: true }))
  signIn(@Body() CredentialsUserDto: CredentialsUserDto) {
    return this.usersService.auth(CredentialsUserDto);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  findOne(@GetUser() user: PublicUserDto) {
    return this.usersService.findOneByEmail(user.email);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: PublicUserDto,
  ) {
    return this.usersService.update(+id, user, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
