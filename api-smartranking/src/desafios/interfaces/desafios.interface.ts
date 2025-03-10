import { Document } from "mongoose";
import { Categoria } from "src/categorias/interfaces/categoria.interface";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import { Resultado } from "src/resultados/interfaces/resultado.interfaces";
import { Status } from "src/status/status.enum";

export interface Desafio extends Document {
    dataHoraDesafio: Date
    status: Status
    dataHoraSolicitacao: Date
    DataHoraResposta: Date
    solicitante: Jogador
    defafiado: Jogador
    categoria: Categoria
    resultado: Array<Resultado>    
}