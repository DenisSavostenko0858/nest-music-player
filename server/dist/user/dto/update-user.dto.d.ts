import { RegisterUserDto } from './register-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<RegisterUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    id: number;
    email: string;
    password: string;
    lastName: string;
    about: string;
    name: string;
    age: string;
}
export {};
