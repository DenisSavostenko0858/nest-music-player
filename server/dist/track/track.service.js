"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackService = void 0;
const common_1 = require("@nestjs/common");
let TrackService = class TrackService {
    create(createTrackDto) {
        return 'This action adds a new track';
    }
    findAll() {
        return `This action returns all track`;
    }
    findOne(id) {
        return `This action returns a #${id} track`;
    }
    update(id, updateTrackDto) {
        return `This action updates a #${id} track`;
    }
    remove(id) {
        return `This action removes a #${id} track`;
    }
};
exports.TrackService = TrackService;
exports.TrackService = TrackService = __decorate([
    (0, common_1.Injectable)()
], TrackService);
//# sourceMappingURL=track.service.js.map