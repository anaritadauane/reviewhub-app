import { 
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UseInterceptors
    } from "@nestjs/common";   
import { Observable, map } from "rxjs";
import { plainToInstance } from "class-transformer";
import { UserDto } from "src/user/dto/user.dto";


interface ClassContructor{
    new (...args: any[]) : {}
}

export  function Serialize(dto: ClassContructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor( private dto : any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
     return next.handle().pipe(
        // Runs before response is sent out
        map(
            (data: any) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                });
            }
        )
     )
    }
}