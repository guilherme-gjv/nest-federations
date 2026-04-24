import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, {
    bodyParser: false,
  });
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
