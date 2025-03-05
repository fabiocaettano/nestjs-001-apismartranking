import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Model } from 'mongoose';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>
    ) {}

    async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {

        const categoriaEncontrada = this.categoriaModel.findOne({ categoria }).exec();
        
        if (!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não encontrada`);
        }   

        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto }).exec();
    }

    async atribuirCategoriaJogador(categoria: string, _idJogador: any): Promise<void> { 
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        
        if (!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não encontrada`);
        }

        const jogadorJaCadastradoCategoria = await this.categoriaModel
            .find({ categoria })
            .where('jogadores')
            .in(_idJogador)
            .exec();

        if (jogadorJaCadastradoCategoria.length > 0) {
            throw new NotFoundException(`Jogador ${_idJogador} já cadastrado na categoria ${categoria}`);
        }

        categoriaEncontrada.jogadores.push(_idJogador);

        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: categoriaEncontrada }).exec();


    }

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {        
        
        const { categoria } = criarCategoriaDto;
        
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        
        if (categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} já cadastrada`);
        }
        
        const novaCategoria = new this.categoriaModel(criarCategoriaDto);
        
        return await novaCategoria.save();
    }

    async consultarTodasCategorias(): Promise<Categoria[]> {
        return await this.categoriaModel.find().exec();
    }

    async consultarCategoriaPelaDescricao(categoria: string): Promise<Categoria> {

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não encontrada`);
        }

        return categoriaEncontrada;
    }

    async consultarCategoriaPeloId(_id: string): Promise<Categoria> {

        const categoriaEncontrada = await this.categoriaModel.findOne({ _id }).exec();

        if (!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${_id} não encontrada`);
        }

        return categoriaEncontrada;
    }
}
