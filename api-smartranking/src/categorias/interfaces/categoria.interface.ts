import { Document } from "mongoose";
import { Evento } from "src/eventos/interfaces/evento.interface";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export interface Categoria extends Document {
    readonly categoria: string;
    descricao: string;
    eventos: Array<Evento>;
    jogadores: Array<Jogador>;
}
