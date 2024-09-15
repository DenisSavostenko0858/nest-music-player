import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from "./dto/login-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: RegisterUserDto): Promise<{
        userNew: {
            id: number;
            name: string;
            email: string;
            password: string;
            lastName: string | null;
            age: Date | null;
            about: string | null;
        };
        token: any;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            lastName: string | null;
            age: Date | null;
            about: string | null;
        };
        token: any;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        lastName: string | null;
        age: Date | null;
        about: string | null;
    }[]>;
    findOne(id: string): Promise<{
        comments: ({
            music: {
                id: number;
                name: string;
                artistId: number;
                text: string;
                listens: number;
                picture: string;
                audio: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            text: string;
            musicId: number;
            userId: number;
            rating: number | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        id: number;
        name: string;
        email: string;
        password: string;
        lastName: string | null;
        age: Date | null;
        about: string | null;
    }>;
    checkUser(updateUserDto: UpdateUserDto): Promise<{
        token: any;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        lastName: string | null;
        age: Date | null;
        about: string | null;
    }>;
}
