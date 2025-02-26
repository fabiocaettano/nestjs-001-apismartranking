import { Injectable , Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {        
        
        const {email, nome, telefoneCelular} = criarJogadorDto;
        
        const jogador: Jogador = {
            _id : uuidv4(),
            email,
            nome,
            telefoneCelular,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg'
        }

        this.logger.log(`criarAtualizarJogadorDto: ${JSON.stringify(jogador)}`);

        this.jogadores.push(jogador);
    }
}
