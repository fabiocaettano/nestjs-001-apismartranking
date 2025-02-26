import { Injectable , Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {                
        
        const { email } = criarJogadorDto;

        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);

        if(jogadorEncontrado){
            this.atualizar(jogadorEncontrado, criarJogadorDto);
        } else {
            this.criar(criarJogadorDto);
        }
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return this.jogadores
    }

    async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
        
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
        
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }
        
        return jogadorEncontrado;
    }

    private criar(criarJogadorDto: CriarJogadorDto): void{
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

    private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): void{
        const {nome} = criarJogadorDto;
        jogadorEncontrado.nome = nome;
    }
}
