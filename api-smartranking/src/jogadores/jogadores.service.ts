import { BadRequestException, Injectable , Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dto/atualizarr-jogador.dto';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    private readonly logger = new Logger(JogadoresService.name);

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {                
        
        const { email } = criarJogadorDto;
        
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncontrado){
            throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`);    
        } 
        
        const jogadorCriado = new this.jogadorModel(criarJogadorDto);
        return await jogadorCriado.save();
    }

    async atualizarJogador(_id, atualizarJogadorJogadorDto: AtualizarJogadorDto): Promise<void> {                
        
                
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com ${_id} não encontrado`);
        } 

        await this.jogadorModel.findOneAndUpdate({_id}, {$set: atualizarJogadorJogadorDto}).exec();
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

    async deletarJogadorPeloEmail(email: string): Promise<any> {
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }

        return await this.jogadorModel.deleteOne({email}).exec();
    }    

    async deletarJogadorPeloId(_id: string): Promise<any> {
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }

        return await this.jogadorModel.deleteOne({_id}).exec();
    }
}
