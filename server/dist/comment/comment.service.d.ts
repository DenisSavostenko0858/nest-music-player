import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from "../prisma.service";
export declare class CommentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCommentDto: CreateCommentDto): Promise<{
        id: number;
        text: string;
        musicId: number;
        userId: number;
        rating: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            lastName: string | null;
            age: Date | null;
            about: string | null;
        };
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
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__CommentClient<{
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            lastName: string | null;
            age: Date | null;
            about: string | null;
        };
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
