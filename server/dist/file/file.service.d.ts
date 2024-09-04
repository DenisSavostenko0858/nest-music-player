export declare enum FileType {
    AUDIO = "audio",
    IMAGE = "image"
}
export declare class FileService {
    createFile(type: FileType, file: any): string;
    deleteFile(fileName: string): Promise<void>;
}
