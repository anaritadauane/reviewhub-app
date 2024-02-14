import { Controller, Get, Post, Body, Patch, Param, Delete, Session, 
         UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize} from 'src/interceptors/serialize.interceptors';
// import { UseInterceptors } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
// import { SigninDto } from './dto/signin-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';   
import { AuthGuard } from '../guards/auth.guard';
import { SigninDto } from './dto/signin-user.dto';


@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UserController {
  constructor( private userService: UserService,
               private authService: AuthService
    ) {}


  // @Get('/profile')
  // getProfile(@Session() session : any){
  //   const user = this.userService.findOne(session.userId);
  //   return user;
  // }


  @Get('/profile')
  @UseGuards(AuthGuard)
  getProfile(@CurrentUser() user: User){
    return user;
  }

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    // I could use body.email, body.password 
    const user = await this.authService.signup(
      createUserDto.firstName,
      createUserDto.surname,
      createUserDto.username,
      createUserDto.email,
      createUserDto.password
    );

    session.userId = user.id;
    
    return user;

  }

  @Post('/signin')
  async signin(@Body() signInDto: {email: string, password: string}, @Session() session: any) {
    // console.log(body)
   
    const user = await this.authService.signin(signInDto.email, signInDto.password);

    session.userId = user.id;
    return user;
   
  }

  @Post('/signout')
  signOut(@Session() session : any){
    session.userId = null;
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
