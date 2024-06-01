import { Body, Controller, Delete, Get, Param, Post, Put,UploadedFile,UseGuards, UseInterceptors  } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService:MovieService){}

    @Get('/list_movies')
    async findAllMovies():Promise<any>{
        return await this.movieService.findAllMovies();
    }
    
    @Get('/list_movies:id')
    async findOneMovie(@Param('id') id:string):Promise<Movie>{
        return await this.movieService.findOneMovie(id);

    }

    @Post('/insert_movie')
    @UseInterceptors(
        FileInterceptor('poster', {
          storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              const ext = file.originalname.split('.').pop();
              cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
            },
          }),
        }),
      )
      
    async createMovie(@Body() movie:Movie,@UploadedFile() file: Express.Multer.File,):Promise<Movie>{
        const posterPath = file.path;
        return await this.movieService.createMovies(movie,posterPath);
    }

    @Put('/update_movie')
    async updateMovie(@Param('id') id: string, @Body() updateMovie: Movie) {
        return await this.movieService.updateMovie(id, updateMovie);
      }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.movieService.deleteMovie(id);
  }

}
