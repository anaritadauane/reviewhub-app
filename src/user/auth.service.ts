// sign up and sigin functionality 
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Script } from 'vm';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor( private userService: UserService) {}

    async signup(firstName: string, 
                 surname: string,
                 username: string,
                 email: string, 
                 pass: string){
        // check if email is in use 

        const users = await this.userService.findByEmail(email);

        if(users.length){
            throw new BadRequestException('Email already in use');
        }
        

        // hash the users password 

        //generate salt  
        const salt = randomBytes(8).toString('hex');

        //hash the password and salt together 
        const hash = (await scrypt(pass, salt, 32) as Buffer);


        // join the hashed result and salt  together 
        const password = salt + '.' + hash.toString('hex');

        //create new user and save it
        const user = await this.userService.create({
            firstName, 
            surname,
            username, 
            email,
            password});


        // return the user
        return user;


    }


    signin(){

    }
}
