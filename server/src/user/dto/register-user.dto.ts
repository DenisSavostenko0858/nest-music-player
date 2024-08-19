import {IsString} from "class-validator";
import {User} from "../entities/user.entity";

export class RegisterUserDto {
    @IsString()
    name: string

    @IsString()
    email: string

    @IsString()
    password: string
}
