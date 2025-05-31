import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Prisma MSSQL Example')
    .setDescription('API documentation for NestJS + Prisma + MSSQL')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Thiết lập bảo vệ basic auth cho Swagger UI
  app.use(['/api/docs'], (req, res, next) => {
    const auth = { login: 'admin', password: 'admin' };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    if (login && password && login === auth.login && password === auth.password) {
      return next();
    }
    res.set('WWW-Authenticate', 'Basic realm="401"');
    res.status(401).send('Authentication required.');
  });

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`Swagger docs: http://localhost:3000/api/docs`);
}
bootstrap();