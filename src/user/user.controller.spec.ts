import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';

describe('UserController', () => {
  let controller: UserController;
  let authService: AuthService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByEmail: jest.fn(),
    findOne: jest.fn(), 
    update: jest.fn(),
    remove: jest.fn() 
  
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{

        provide: UserService,
        useValue: mockUserService

      }, 
     AuthService],
    }).compile();

    controller = module.get<UserController>(UserController);
    authService = module.get<AuthService>(AuthService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new user by the given data', async () => {
    // arrange 
    const createUserDto = {
      firstName: 'Jonh', 
      surname: 'Doe', 
      username: 'jonhdoe',
      email: 'jonhdoe@email.com',
      password: 'bjbdsjh'
    } as CreateUserDto;

    const user = {
      id: Date.now(), // returns random numbers between 1000 and 10000
      firstName: 'Jonh', 
      surname: 'Doe', 
      username: 'jonhdoe',
      email: 'jonhdoe@email.com',
      password: 'bjbdsjh'
    } as User;

    jest.spyOn(mockUserService, 'create').mockReturnValue(user)

    // act 
    const result = await controller.create(createUserDto);

    // assert 
    expect(mockUserService.create).toHaveBeenCalled();
    expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
    expect(authService.signup).toHaveBeenCalledWith(createUserDto.firstName,
      createUserDto.surname, createUserDto.email, createUserDto.password);
  });
});
