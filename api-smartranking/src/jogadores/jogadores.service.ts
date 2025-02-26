import { Injectable , Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {                
        
        const { email } = criarJogadorDto;
        
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncontrado){
            this.atualizar(criarJogadorDto);
        } else {
            this.criar(criarJogadorDto);
        }
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();        
    }

    async consultarJogadorPeloEmail(email: string): Promise<Jogador> {

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }
        return jogadorEncontrado;            
    }
    
    async consultarJogadorPeloId(_id: string): Promise<Jogador> {
        this.logger.log(`_id: ${_id}`);
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }
        return jogadorEncontrado;        
    }

    async deletarJogador(email: string): Promise<any> {
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }
        return await this.jogadorModel.deleteOne({email}).exec();
    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const jogadorCriado = new this.jogadorModel(criarJogadorDto);
        return await jogadorCriado.save();
    }

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<any> {        
        return await this.jogadorModel.findOneAndUpdate({email: criarJogadorDto.email}, {$set: criarJogadorDto}).exec();        
    }
}
