import { Injectable , Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {                
        
        const { email } = criarJogadorDto;

        //const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);        

        //if(jogadorEncontrado){
        //    this.atualizar(jogadorEncontrado, criarJogadorDto);
        //} else {
        //    this.criar(criarJogadorDto);
        //}

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncontrado){
            this.atualizar(criarJogadorDto);
        } else {
            this.criar(criarJogadorDto);
        }
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
        //return this.jogadores
    }

    async consultarJogadorPeloEmail(email: string): Promise<Jogador> {

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }

        return jogadorEncontrado;
        
        /*const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
        
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }

        return jogadorEncontrado;*/
    }
    
    async consultarJogadorPeloId(_id: string): Promise<Jogador> {
        this.logger.log(`_id: ${_id}`);

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }

        return jogadorEncontrado;

        /*const jogadorEncontrado = this.jogadores.find(jogador => jogador._id === _id);
        
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }

        return jogadorEncontrado;*/
    }

    async deletarJogador(email: string): Promise<any> {

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }

        return await this.jogadorModel.deleteOne({email}).exec();

        /*const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }

        this.jogadores = this.jogadores.filter(jogador => jogador.email !== email);*/

    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

        const jogadorCriado = new this.jogadorModel(criarJogadorDto);
        return await jogadorCriado.save();
        /*const {email, nome, telefoneCelular} = criarJogadorDto;
        
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

        this.jogadores.push(jogador);*/
    }

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<any> {
        
        return await this.jogadorModel.findOneAndUpdate({email: criarJogadorDto.email}, {$set: criarJogadorDto}).exec();
        
        //return await this.jogadorModel.findOne({email: criarJogadorDto.email}).exec();
        //const {nome} = criarJogadorDto;
        //jogadorEncontrado.nome = nome;
    }
}
