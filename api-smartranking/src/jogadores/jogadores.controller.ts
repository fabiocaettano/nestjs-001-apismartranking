import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}
    
    @Post()
    async criarAtualizarJogador(
        @Body() atualizadorJogadorDto : CriarJogadorDto
    ) {
        await this.jogadoresService.criarAtualizarJogador(atualizadorJogadorDto);
    }

    @Get()
    async consultarJogadores(
        @Query('email') email: string
    ): Promise<Jogador[] | Jogador> {
        if  (email) {
            return this.jogadoresService.consultarJogadorPeloEmail(email);
        }else{
            return this.jogadoresService.consultarTodosJogadores();
        }        
    }

    @Get(':_id')
    async consultarJogadorPeloId(@Param('_id') _id: string): Promise<Jogador> {
        return this.jogadoresService.consultarJogadorPeloId(_id);
    }

    @Delete()
    async deletarJogador(
        @Query('email') email: string
    ): Promise<void> {
        this.jogadoresService.deletarJogador(email);
    }    
}
