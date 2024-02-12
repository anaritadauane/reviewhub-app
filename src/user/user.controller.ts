import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize} from 'src/interceptors/serialize.interceptors';
// import { UseInterceptors } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin-user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor( private userService: UserService,
               private authService: AuthService
    ) {}


  @Get('/profile')
  getProfile(@Session() session : any){
    const user = this.userService.findOne(session.userId);
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
  async signin(@Body() body: {email: string, password: string}, @Session() session: any) {
    // console.log(body)
   
    const user = await this.authService.signin(body.email, body.password);

    console.log(user.firstName)

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
