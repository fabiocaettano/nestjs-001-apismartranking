import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGODB}`, {
      serverSelectionTimeoutMS: 60000, // 60 segundos
    }),
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
