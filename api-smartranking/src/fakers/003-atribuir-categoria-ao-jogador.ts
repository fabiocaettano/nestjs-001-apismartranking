import { Document, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { ConnectionString } from './connection-string';
import { Evento } from 'src/eventos/interfaces/evento.interface';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Categoria } from 'src/categorias/interfaces/categoria.interface';
import { CategoriasController } from 'src/categorias/categorias.controller';

// String Conexão MongoDB
const connectionString = ConnectionString.get();

// Definir a interface
interface IJogador extends Document {    
    nome: string;
    email: string;
    telefone: string;
}

interface ICategoria extends Document {    
    categoria: string;
    descricao: string;
    eventos: Array<Evento>;
    jogadores: Schema.Types.ObjectId[];
}

// Definir o schema
const jogadorSchema = new Schema<IJogador>({    
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true }
});

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

// Criar o modelo Jogaodr
const Jogador = mongoose.model<IJogador>('jogadores', jogadorSchema);
const Categoria = mongoose.model<ICategoria>('categorias', categoriaSchema);

// Função para embaralhar um array
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const atribuirCategoriaAoJogador = async() => {

    try{
        // conexão
        await mongoose.connect(connectionString);

        // Obter todos os jogadores e embaralhar listas dos jogadores
        const jogadores: Jogador[] = await Jogador.find();
        shuffleArray(jogadores); 

        // vincular os 50 primeiros com a categoria A
        const jogadoresA = jogadores.slice(0, 50).map(j => j._id)
        const jogadoresB = jogadores.slice(50, 200).map(j => j._id)
        const jogadoresC = jogadores.slice(200, 1000).map(j => j._id)

        await Categoria.findOneAndUpdate({"categoria":"A"},{ "jogadores": jogadoresA});              
        console.log(`${jogadoresA.length} Jogadores vinculados a classe A`)
        await Categoria.findOneAndUpdate({"categoria":"B"},{ "jogadores": jogadoresB});              
        console.log(`${jogadoresB.length} Jogadores vinculados a classe B`)
        await Categoria.findOneAndUpdate({"categoria":"C"},{ "jogadores": jogadoresC});                       
        console.log(`${jogadoresC.length} Jogadores vinculados a classe C`)
    
    }catch(error){
        console.error('Erro ao inserir categorias:', error);
    }finally{
        // Fechar a conexão
        await mongoose.connection.close();
    }
}

atribuirCategoriaAoJogador()