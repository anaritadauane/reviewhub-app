import { IsString, IsNumber } from "class-validator";

export class CreateBusinessDto {

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    website: string;
    
    @IsNumber()
    phoneNUmber: number;

    @IsString()
    email: string; 

    @IsString()
    address: string;

}
