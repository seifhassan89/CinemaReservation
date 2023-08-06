import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  // ================== Create a logger instance ==================
  const logger = WinstonModule.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
  });

  // ================== Create the NestJS app ==================
  const app = await NestFactory.create(AppModule, { logger });

  // ================== Enable CORS ==================
  app.enableCors({
    origin: process.env.CLIENT_URL,
  });

  // ================== Middleware (Log all requests) ==================
  app.use((req, _, next) => {
    logger.log(
      `${req.method} ${req.originalUrl} ${JSON.stringify(
        req.query,
      )} ${JSON.stringify(req.params)} ${req.statusCode ?? ''}`,
    );
    return next();
  });

  // ================== Swagger ==================
  const options = new DocumentBuilder()
    .setTitle('Cima Web API')
    .setDescription('Back End for Cima App')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Cima Swagger API',
  });

  // ================== Validation ==================
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, skipMissingProperties: true }),
  );

  // ================== Start the app ==================
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
