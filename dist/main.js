"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const hbs = require("express-handlebars");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setViewEngine('hbs');
    app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
    app.useStaticAssets(path_1.join(__dirname, '..', 'unzipped'));
    app.setBaseViewsDir(path_1.join(__dirname, '..', 'public'));
    app.enableCors({
        origin: '*',
    });
    app.engine('hbs', hbs({
        extname: 'hbs',
        defaultLayout: 'layout_main',
        layoutsDir: path_1.join(__dirname, '..', 'views', 'layouts'),
        partialsDir: path_1.join(__dirname, '..', 'views', 'partials'),
        helpers: {},
    }));
    const port = 3000;
    await app.listen(port);
    console.log(`app running at http://localhost:${port}/`);
}
bootstrap();
//# sourceMappingURL=main.js.map