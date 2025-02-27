import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    ConfigModule.forRoot(),    
    MongooseModule.forRoot(`${process.env.MONGODB}`, {
      serverSelectionTimeoutMS: 60000, // 60 segundos
    }),
    JogadoresModule,
    CategoriasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
