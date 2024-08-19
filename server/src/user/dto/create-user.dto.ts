import {IsString} from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string

    @IsString()
    surname: string

    @IsString()
    email: string

    @IsString()
    password: string
}
