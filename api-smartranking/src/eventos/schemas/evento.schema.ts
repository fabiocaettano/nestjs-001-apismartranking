import { Schema } from 'mongoose';

export const EventoSchema = new Schema({
    nome: { type: String, required: true },
    operacao: { type: String, required: true },
    valor: { type: Number, required: true }
});