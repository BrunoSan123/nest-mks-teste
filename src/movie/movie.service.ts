import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository:Repository<Movie>,
        @InjectRedis() private readonly redis: Redis
    ){}

    async findAllMovies():Promise<any>{
        const keys = await this.redis.keys('movie:*');
        const movies = [];
    
        for (const key of keys) {
          const movieString = await this.redis.get(key);
          if (movieString) {
            movies.push(JSON.parse(movieString));
          }
        }
    
        return movies;
      
        
    
    }

   async findOneMovie(id:string):Promise<Movie>{
        const movie = await this.movieRepository.findOne({where:{id}});
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
          }
        return movie;
    }

    async createMovies(movie:Movie,posterPath:string):Promise<Movie>{
        const savedMovie=await this.movieRepository.save({...movie,posterPath});
        await this.redis.set(`movie:${savedMovie.id}`, JSON.stringify(savedMovie));
        return savedMovie;
    }

    async updateMovie(id:string,movie:Movie){
        const existentMovie=await this.movieRepository.findOne({where:{id}})
        if(!existentMovie){
            throw new NotFoundException(`Filme com o id ${id} não foi encontrado`);
        }else{
            const movieToUpdate=await this.movieRepository.update(id,movie);
            return movieToUpdate;
        }

    }

    async deleteMovie(id:string){
        const existentMovie=await this.movieRepository.findOne({where:{id}})
        if(!existentMovie){
            throw new NotFoundException(`Filme com o id ${id} não foi encontrado`);
        }else{
            await this,this.movieRepository.delete(id);
            return 'Filme deletado com sucesso'
        }
    }


}
