import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from "@nestjs/config";
import * as cookieParser from 'cookie-parser';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // app.use(cookieParser());

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
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    });

    const configService = app.get(ConfigService);

    const config = new DocumentBuilder()
        .setTitle('React-nest-mongo-app')
        .setDescription('The React-nest-mongo-app API description')
        .setVersion('1.0')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    //const port = configService.get<number>('APP_PORT') || 3000;
    const port = process.env.PORT || 3000;


    await app.listen(port);
}

bootstrap();
