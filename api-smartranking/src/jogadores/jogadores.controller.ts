import { Controller, Post } from '@nestjs/common';

@Controller('api/v1/jogadores')
export class JogadoresController {

    
    @Post()
    async criarAtualizarJogador() {
        const objeto = JSON.stringify({
            "nome": "Jogador Teste",
            "telefoneCelular": "11999999999",
            "email": "",
            "ranking": "A2",
            "posicaoRanking": 1,
            "urlFotoJogador": "www.google.com.br/foto.jpg"
        });
        return objeto;
    }

}
