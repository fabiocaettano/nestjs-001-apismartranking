import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

    
    @Post()
    async criarAtualizarJogador(
        @Body() atualizadorJogadorDto : CriarJogadorDto
    ) {
        const {email} = atualizadorJogadorDto;
        const objeto = JSON.stringify(`{
            "email": ${email},            
        }`);
        return objeto;
    }
}
