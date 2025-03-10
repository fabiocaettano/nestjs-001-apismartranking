import * as mongoose from 'mongoose';

export const DesafioSchema = new mongoose.Schema({
    dataHoraDesafio: { type: Date },
    status: { type: String },
    dataHoraSolicitacao: { type: Date },
    dataHoraResposta: { type: Date },
    solicitante: {type: mongoose.Schema.Types.ObjectId, ref: "Jogador"},
    desafiado: {type: mongoose.Schema.Types.ObjectId, ref: "Jogador"},
    categoria: {type: mongoose.Schema.Types.ObjectId, ref: "Categoria"},
    resultado: [
        { set: {type: String} }
    ]   
,    
}, {timestamps: true, collection: 'desafios' })
