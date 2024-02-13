import { IsString,
         IsNumber, 
         IsDate} from "class-validator";



export class CreateReviewDto {

    @IsString()
    title: string;

    @IsString()
    description: string; 

    @IsDate()
    datePosted: Date; 

    @IsNumber()
    helpfulCount: number;
}
