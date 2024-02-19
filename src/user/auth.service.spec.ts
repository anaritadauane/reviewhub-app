import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";


it('can create an instance of auth service', async () =>{
    const module = await Test.createTestingModule({
        providers: [AuthService]
    }).compile()

    const service = module.get(AuthService);

    expect(service).toBeDefined();
}) 