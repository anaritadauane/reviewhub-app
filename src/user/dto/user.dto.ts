import { Expose } from "class-transformer";

export class UserDto {

    @Expose()
    id: number;

    @Expose()
    firstName: string;

    @Expose()
    surname: string;

    @Expose()
    username: string;

    @Expose()
    email: string;
}