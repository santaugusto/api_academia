import { Repository } from 'typeorm';
import { EnderecoFuncionario } from './entities/endereco_funcionario.entity'; 
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnderecoFuncionarioDto } from './dto/create-endereco_funcionario.dto';
import { UpdateEnderecoFuncionarioDto } from './dto/update-endereco_funcionario.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EnderecoFuncionarioService {
  constructor(
    @InjectRepository(EnderecoFuncionario)
    private readonly repository: Repository<EnderecoFuncionario>){}


  create(createEnderecoFuncionarioDto: CreateEnderecoFuncionarioDto) {
    const endereco = this.repository.create(createEnderecoFuncionarioDto)
    return this.repository.save(endereco);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id_endereco_funcionario: number) {
    const endereco = await this.repository.findOne({where:{ id_endereco_funcionario }});
    if (!endereco) {
      throw new NotFoundException(`EnderecoFuncionario com ID ${id_endereco_funcionario} não encontrado`);
    }
    return endereco;
  }

  // Atualiza um endereço específico
  async update(id_endereco_funcionario: number, updateEnderecoFuncionarioDto: UpdateEnderecoFuncionarioDto) {
    const endereco = await this.repository.findOne({ where: { id_endereco_funcionario } });
    if (!endereco) {
        throw new NotFoundException(`EnderecoFuncionario com ID ${id_endereco_funcionario} não encontrado`);
    }
    await this.repository.update(id_endereco_funcionario, updateEnderecoFuncionarioDto);
    return this.repository.findOne({ where: { id_endereco_funcionario } });
}


  // Remove um endereço específico
  async remove(id_funcionario: number) {
    const resultado = await this.repository.delete(id_funcionario);
    if (resultado.affected === 0) {
      throw new NotFoundException(`EnderecoFuncionario com ID ${id_funcionario} não encontrado`);
    }
    return { message: `EnderecoFuncionario com ID ${id_funcionario} foi removido com sucesso` };
  }
}
