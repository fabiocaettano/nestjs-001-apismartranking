import { Param ,Body, Controller, Get, Post, UsePipes, ValidationPipe, Logger, Put } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) {}

    logger = new Logger(CategoriasController.name);

    @Put('/:categoria/categoria')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(
        @Body() atualizarCategoriaDto: CriarCategoriaDto,
        @Param('categoria') categoria: string
    ) {
        this.logger.log(`atualizarCategoria | categoria: ${categoria}`);
        return await this.categoriasService.atualizarCategoria(categoria, atualizarCategoriaDto);
    }

    @Post('/:categoria/jogadores/:_idJogador')
    async atribuirCategoriaJogador(
        @Param('categoria') categoria: string,
        @Param('_idJogador') _idJogador: string
    ) {
        this.logger.log(`atribuirCategoriaJogador | categoria: ${categoria} | _idJogador: ${_idJogador}`);
        return await this.categoriasService.atribuirCategoriaJogador(categoria, _idJogador);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {
        return this.categoriasService.criarCategoria(criarCategoriaDto);
    }

    @Get()
    async consultarTodasCategorias() {
        return await this.categoriasService.consultarTodasCategorias();
    }

    @Get('/:categoria/categoria')
    async consultarCategoriaPelaDescricao(@Param('categoria') categoria: string) {        
        this.logger.log(`consultarCategoriaPelaDescricao | categoria: ${categoria}`);
        return await this.categoriasService.consultarCategoriaPelaDescricao(categoria);
    }

    @Get('/:_id/id')
    async consultarCategoriaPeloId(@Param('_id') _id: string) {        
        this.logger.log(`consultarCategoriaPeloID | _id: ${_id}`);
        return await this.categoriasService.consultarCategoriaPeloId(_id);
    }
}
