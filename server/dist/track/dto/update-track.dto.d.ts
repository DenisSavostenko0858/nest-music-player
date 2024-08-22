import { CreateNewTrackDto } from './create-new-track.dto';
declare const UpdateTrackDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateNewTrackDto>>;
export declare class UpdateTrackDto extends UpdateTrackDto_base {
    name?: string;
    artistId?: number;
    text?: string;
    listens?: number;
    picture?: string;
    audio?: string;
}
export {};
