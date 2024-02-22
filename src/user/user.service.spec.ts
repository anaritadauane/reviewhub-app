import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserController } from './user.controller';
import { Review } from '../reviews/entities/review.entity';

describe('UserService', () => {
  let service: UserService;

  // mock the user repository 
  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, 
      {
        provide: getRepositoryToken(User),
        useValue: mockUserRepository
      }, 
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a new user and saves into the database', async () => {
    // arrange

    const createUserDto = {
      firstName: 'Jonh', 
      surname: 'Doe', 
      username: 'jonhdoe',
      email: 'jonhdoe@email.com',
      password: 'bjbdsjh'
    } as CreateUserDto;

    const user = {
      id: Math.floor(Math.random() * (10000 - 1000) + 1000), // returns random numbers between 1000 and 10000
      firstName: 'Jonh', 
      surname: 'Doe', 
      username: 'jonhdoe',
      email: 'jonhdoe@email.com',
      password: 'bjbdsjh'
    } as User;

    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    // act 
    const result = await service.create(createUserDto);

    // assert
    expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
    expect(mockUserRepository.save).toHaveBeenCalled();
    

    expect(result).toEqual(user);

  });


  
  it('returns all the users (findAll)', async () => {
    // arrange 

    const user = {
      id: Date.now(),
      firstName: 'Jonh', 
      surname: 'Doe', 
      username: 'jonhdoe',
      email: 'jonhdoe@email.com',
    };

    const users = [user];
    jest.spyOn(mockUserRepository, 'find').mockReturnValue(users);


    // act 
    const result = await service.findAll(); 

    // assert 
    expect(result).toEqual(users);
    expect(mockUserRepository.find).toHaveBeenCalled();
  })

  it('returns all the users by email', async () => {
    // arrange

    const user = {
      id: 1,
      firstName: 'Jonh', 
      surname: 'Doe', 
      username: 'jonhdoe',
      email: 'jonhdoe@email.com',
    };

    const email = user.email;

    const users = [user] || user;
    jest.spyOn(mockUserRepository, 'find').mockReturnValue(users);

    // act 
    const result = await service.findByEmail(user.email);

    // assert 

    // expect(mockUserRepository.find).toHaveBeenCalled();
    expect(mockUserRepository.find).toHaveBeenCalledWith({where: { email }});
    expect(result).toEqual(users)
  });

  it('finds one user by id', async () => {
     // arrange

     const id = 1;

     const user = {
      id: 1,
      firstName: 'Jonh', 
      surname: 'Doe', 
      username: 'jonhdoe',
      email: 'jonhdoe@email.com',
    };


    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);

    // act 
    const result = await service.findOne(id);

    // assert 

    // expect(mockUserRepository.find).toHaveBeenCalled();
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({where: { id }});
    expect(result).toEqual(user)
  });

  it('update the user object', async () => {
     // arrange

     const id = 1;
     const user = {
      id: 1,
      firstName: 'Jonh', 
      surname: 'Doe', 
      username: 'jonhdoe',
      email: 'jonhdoe@email.com',
    };

    // const email = user.email;

    const users = [user] || user;
    jest.spyOn(mockUserRepository, 'save').mockReturnValue(users);

    // act 
    const result = await service.update(id, user);

    // assert 

    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    expect(result).toEqual(users)
  });

  it('remove the user object', async () => {
     // arrange
    
     const id = 1;

     const user = {
      id: 1,
      firstName: 'Jonh', 
      surname: 'Doe', 
      username: 'jonhdoe',
      email: 'jonhdoe@email.com',
    };

    
    jest.spyOn(mockUserRepository, 'remove').mockReturnValue(user);

    // act 
    const result = await service.remove(id);

    // assert 

    // expect(mockUserRepository.remove).toHaveBeenCalled();
    expect(mockUserRepository.remove).toHaveBeenCalledWith(user);
    expect(result).toEqual(user);
  });
});

