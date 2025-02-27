import { PipeTransform, ArgumentMetadata , Logger, BadRequestException } from '@nestjs/common';

export class JogadoresValidacaoParametrosPipe implements PipeTransform {
  
  private readonly logger = new Logger(JogadoresValidacaoParametrosPipe.name);
  
  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.log(`value: ${value}`);
    this.logger.log(`metadata type : ${metadata.type}`); 
    this.logger.log(`metadata data: ${metadata.data}`); 

    
    if(!value){
      throw new BadRequestException(`O valor do parâmetro ${metadata.data}  não foi informado`);
    }
    return value;
  }
}