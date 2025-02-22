import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from "@nestjs/config";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.enableCors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                "https://react-nest-mongo-app-seven.vercel.app",
            ];


            if (!origin || origin.startsWith("http://localhost") || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    });

    const configService = app.get(ConfigService);

    //const port = configService.get<number>('APP_PORT') || 3000;
    const port = process.env.PORT || 3000;


    await app.listen(port);
}

bootstrap();
