import { IsNotEmpty, IsString } from "class-validator";

export class AtribuirCategoriaJogadorDto{

    @IsString() 
    @IsNotEmpty()
    categoria: string;

    @IsString()
    @IsNotEmpty()
    _idJogador: string;
}