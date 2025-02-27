import { Param ,Body, Controller, Get, Post, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) {}

    logger = new Logger(CategoriasController.name);

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {
        return this.categoriasService.criarCategoria(criarCategoriaDto);
    }

    @Get()
    async consultarTodasCategorias() {
        return await this.categoriasService.consultarTodasCategorias();
    }

    @Get('/:categoria')
    async consultarCategoria(@Param('categoria') categoria: string) {
        
        this.logger.log(`categoria: ${categoria}`);
        return await this.categoriasService.consultarCategoria(categoria);
    }
}
