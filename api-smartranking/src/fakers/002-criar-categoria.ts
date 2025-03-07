import { faker } from '@faker-js/faker';
import { Document, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { ConnectionString } from './connection-string';
import { Evento } from 'src/eventos/interfaces/evento.interface';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

// String Conexão MongoDB
const connectionString = ConnectionString.get();

// Definir a interface de categoria
interface ICategoria extends Document {    
    categoria: string;
    descricao: string;
    eventos: Array<Evento>;
    jogadores: Array<Jogador>;
}

// Definir o schema de categoria
const categoriaSchema = new Schema<ICategoria>({
    categoria: { type: String, unique: true },
    descricao: { type: String },
    eventos: [{
        nome: { type: String },             
        operacao: { type: String },
        valor: { type: Number },
    }],
    jogadores: [{
        type: Schema.Types.ObjectId,
        ref: 'Jogador'
    }]
});     

// Criar o modelo Categoria
const Categoria = mongoose.model<ICategoria>('categorias', categoriaSchema);

// Função para gerar dados aleatórios
const categoriaA = new Categoria({
    categoria: 'A',
    descricao: 'Categoria A',
    eventos: [
        {
            nome: 'Vitoria',
            operacao: '+',
            valor: 25
        },
        {
            nome: 'Empate',
            operacao: '+',
            valor: 50
        },
        {
            nome: 'Derrota',
            operacao: '-',
            valor: 5    
        }       
    ], 
});

const categoriaB = new Categoria({
    categoria: 'B',
    descricao: 'Categoria B',
    eventos: [
        {
            nome: 'Vitoria',
            operacao: '+',
            valor: 15
        },
        {
            nome: 'Empate',
            operacao: '+',
            valor: 30
        },
        {
            nome: 'Derrota',
            operacao: '-',
            valor: 0    
        }       
    ], 
});

const categoriaC = new Categoria({
    categoria: 'C',
    descricao: 'Categoria C',
    eventos: [
        {
            nome: 'Vitoria',
            operacao: '+',
            valor: 5
        },
        {
            nome: 'Empate',
            operacao: '+',
            valor: 10
        },
        {
            nome: 'Derrota',
            operacao: '-',
            valor: 0    
        }       
    ], 
});

const insertCategorias = async () => {
    try {        
        await mongoose.connect(connectionString);
        await Categoria.insertMany([categoriaA, categoriaB, categoriaC]);
        console.log('Categorias inseridas com sucesso!');
    } catch (error) {   
        console.error('Erro ao inserir categorias:', error);
    }
    finally {
        // Fechar a conexão
        await mongoose.connection.close();
    }
}

insertCategorias();