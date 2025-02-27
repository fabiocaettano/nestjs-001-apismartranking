import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Model } from 'mongoose';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>
    ) {}

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {        
        
        const { categoria } = criarCategoriaDto;
        
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        
        if (categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} já cadastrada`);
        }
        
        const novaCategoria = new this.categoriaModel(criarCategoriaDto);
        
        return await novaCategoria.save();
    }
}
