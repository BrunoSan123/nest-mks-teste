// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'movie', // Mude isso para um valor seguro em produção
      signOptions: { expiresIn: '60m' },
    }),
    MovieModule, // Assumindo que você tenha um módulo de usuários para validação
  ],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
