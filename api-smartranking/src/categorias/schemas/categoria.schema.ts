import { Schema } from 'mongoose';
import { EventoSchema } from 'src/eventos/schemas/evento.schema';


export const CategoriaSchema = new Schema({
    categoria: { type: String, required: true, unique: true },
    descricao: { type: String, required: true },
    eventos: { type: [EventoSchema], required: true },
    jogadores: [{ type: Schema.Types.ObjectId, ref: 'Jogador' }]
}, { timestamps: true, collection: 'categorias' });