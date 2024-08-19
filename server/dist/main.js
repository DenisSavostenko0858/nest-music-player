"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const process = require("node:process");
const PORT = process.env.PORT || 5000;
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        await app.listen(PORT);
        console.log(`Сервер запущен http://localhost:${PORT}/api`);
    }
    catch (e) {
        console.error(e);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map