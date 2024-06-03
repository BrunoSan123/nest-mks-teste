import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { RedisModule } from '@nestjs-modules/ioredis'
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'mkstest',
      database: process.env.POSTGRES_DB || 'movie_catalog',
      autoLoadEntities: true,
      synchronize: false, // Não usar em produção
    }),

    RedisModule.forRoot({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      type: 'single'
    }),
    MovieModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
