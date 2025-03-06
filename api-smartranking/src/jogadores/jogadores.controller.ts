import { Put, Body, Controller, Delete, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dto/atualizarr-jogador.dto';
import { query } from 'express';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}
    
    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto : CriarJogadorDto
    ) : Promise<Jogador> {
        return await this.jogadoresService.criarJogador(criarJogadorDto);
    }

    @Put('/:_id/id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Param('_id',ValidacaoParametrosPipe) _id: string,        
        @Body() atualizarJogadorDto : AtualizarJogadorDto
    ): Promise<void>{
        await this.jogadoresService.atualizarJogador(_id,atualizarJogadorDto);
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[] | Jogador> {
        return await this.jogadoresService.consultarTodosJogadores();                
    }

    @Get(':email/email')
    async consultarJogadoresPeloEmail(
        @Param('email',ValidacaoParametrosPipe) email: string
    ): Promise<Jogador[] | Jogador> {
        return await this.jogadoresService.consultarJogadorPeloEmail(email);
    }

    @Get('/:_id/id')
    async consultarJogadorPeloId(
        @Param('_id',ValidacaoParametrosPipe) _id: string
    ): Promise<Jogador> {
        return await this.jogadoresService.consultarJogadorPeloId(_id);
    }

    @Delete('/:email/email')
    async deletarJogadorPeloEmail(
        @Param('email',ValidacaoParametrosPipe) email: string
    ): Promise<void> {
        this.jogadoresService.deletarJogadorPeloEmail(email);
    }    

    @Delete('/:_id/id')
    async deletarJogadorPeloId(
        @Param('_id',ValidacaoParametrosPipe) _id: string
    ): Promise<void> {
        this.jogadoresService.deletarJogadorPeloId(_id);
    }    
}
