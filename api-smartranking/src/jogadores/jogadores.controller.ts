import { Body, Controller, Get, Post } from '@nestjs/common';
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
    consultarJogadores(): Promise<Jogador[]> {
        return this.jogadoresService.consultarTodosJogadores();
    }
}
