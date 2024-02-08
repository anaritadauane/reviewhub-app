import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize} from 'src/interceptors/serialize.interceptors';
// import { UseInterceptors } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor( private userService: UserService,
               private authService: AuthService
    ) {}

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    // I could use body.email, body.password 
    return this.authService.signup(
      createUserDto.firstName,
      createUserDto.surname,
      createUserDto.username,
      createUserDto.email,
      createUserDto.password
    );

    
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
 
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.userService.findOne(+id);

    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
