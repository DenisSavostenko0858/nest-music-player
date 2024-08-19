import {IsOptional, IsString} from "class-validator";

export class User {
    @IsString()
    name: string

    @IsString()
    email: string

    @IsString()
    password: string

    @IsOptional()
    @IsString()
    lastName: string

    @IsOptional()
    age: any

    @IsOptional()
    @IsString()
    about: string
}
