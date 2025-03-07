import { faker } from '@faker-js/faker';
import { Document, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { ConnectionString } from './connection-string';

// String Conexão MongoDB
const connectionString = ConnectionString.get();

// Definir a interface do usuário
interface IJogador extends Document {    
    nome: string;
    email: string;
    telefone: string;
}

// Definir o schema do usuário
const jogadorSchema = new Schema<IJogador>({    
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true }
});

// Criar o modelo Jogaodr
const Jogador = mongoose.model<IJogador>('jogadores', jogadorSchema);


// Função para gerar dados aleatórios
const generateRandomUser = () : IJogador => {
    return new Jogador({        
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        telefone: faker.phone.number()
    });
};


// Função para inserir dados na coleção
interface IInsertRandomUsers {
    (totalJogadores: number): Promise<void>;
}

const insertRandomJogadores: IInsertRandomUsers = async (totalJogadores) => {
    try {                

        await mongoose.connect(connectionString);

        const jogadores: IJogador[] = [];
  
        for (let i = 0; i < totalJogadores; i++) {
            jogadores.push(generateRandomUser());            
        }

        await Jogador.insertMany(jogadores);        

        console.log(`${totalJogadores} jogadores inseridos com sucesso!`);
    } catch (error) {
        console.error('Erro ao inserir jogadores:', error);
    } finally {
        // Fechar a conexão
        await mongoose.connection.close();
    }
};

// Chamar a função para inserir os usuários
const totalJogadores = 1000;
insertRandomJogadores(totalJogadores);