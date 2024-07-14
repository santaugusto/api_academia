import { IsString, IsOptional } from 'class-validator';


export class CreateEnderecoFuncionarioDto {
  
    @IsString()
    rua: string;

    @IsString()
    numero: string;
 
    @IsString()
    bairro: string;
    
    @IsString()
    cidade: string;
    
    @IsString()
    estado: string;
    
    @IsString()
    cep: string;
    
  
  }
  