import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from "../prisma.service";
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private generateToken;
    register(registerUserDto: RegisterUserDto): Promise<{
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
    findOne(id: number): Promise<{
        comments: {
            id: number;
            text: string;
            musicId: number;
            userId: number;
            rating: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: number;
        name: string;
        email: string;
        password: string;
        lastName: string | null;
        age: Date | null;
        about: string | null;
    }>;
}
