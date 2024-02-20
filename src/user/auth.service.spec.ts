import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

describe('AuthService', () => {
let service : AuthService;

beforeEach( async () =>{
    // mock of the UserService
    const mockUserService: Partial <UserService> = {
        findAll: () => Promise.resolve([]),
        create: ( { firstName, 
                    surname, 
                    username, 
                    email,
                    password  }: CreateUserDto) => 
            Promise.resolve({ 
            id: 1, 
            firstName, 
            surname, 
            username, 
            email,
            password } as User)
    }
    const module = await Test.createTestingModule({
        providers: [AuthService, 
        {
            provide: UserService,
            useValue: mockUserService
        }]
    }).compile()

    service = module.get(AuthService);
});

it('can create an instance of auth service', async () =>{
    expect(service).toBeDefined();
}); 

it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('Jane', 'Doe', 'janedoe', 'janedoe@bajkja.com', 'bdkj');

    expect(user.password).not.toEqual('bdkj');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
});

});

