import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInformacaoFuncionarioDto } from './dto/create-informacao-funcionario.dto';
import { UpdateInformacaoFuncionarioDto } from './dto/update-informacao-funcionario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InformacaoFuncionario } from './entities/informacao-funcionario.entity';
import { Repository } from 'typeorm';
import { EnderecoFuncionario } from 'src/endereco_funcionario/entities/endereco_funcionario.entity';

@Injectable()
export class InformacaoFuncionarioService {
  constructor(
    @InjectRepository(InformacaoFuncionario)
    private readonly repository: Repository<InformacaoFuncionario>,
    @InjectRepository(EnderecoFuncionario) 
    private readonly enderecoRepository: Repository<EnderecoFuncionario>,
  ) {}

  async create(createInformacaoFuncionarioDto: CreateInformacaoFuncionarioDto) {
    const endereco = await this.enderecoRepository.findOne({ where: { id_endereco_funcionario: createInformacaoFuncionarioDto.id_endereco_funcionario } });
    if (!endereco) {
      throw new NotFoundException(`Endereço com ID ${createInformacaoFuncionarioDto.id_endereco_funcionario} não encontrado`);
    }

    const informacao = this.repository.create({
      ...createInformacaoFuncionarioDto,
      id_endereco_funcionario: endereco,
      data_nascimento: createInformacaoFuncionarioDto.data_nascimento.toISOString().split('T')[0], // Convertendo Date para string
      data_cadastro: createInformacaoFuncionarioDto.data_cadastro.toISOString().split('T')[0], // Convertendo Date para string
      data_desligamento: createInformacaoFuncionarioDto.data_desligamento?.toISOString().split('T')[0], // Convertendo Date para string, se existir
    });
    return await this.repository.save(informacao);
  }

  async findAll(): Promise<InformacaoFuncionario[]> {
    return await this.repository.find({ relations: ['id_endereco_funcionario'] }); 
  }

  async findOne(id: number): Promise<InformacaoFuncionario> {
    const informacao = await this.repository.findOne({ where: { id_informacoes_cadastro_funcionario: id }, relations: ['id_endereco_funcionario'] });
    if (!informacao) {
      throw new NotFoundException(`Informação com ID ${id} não encontrada`);
    }
    return informacao;
  };

  async update(id: number, updateInformacaoFuncionarioDto: UpdateInformacaoFuncionarioDto) {
    const informacao = await this.findOne(id);
  
    // Verifica se o ID do endereço foi fornecido
    if (updateInformacaoFuncionarioDto.id_endereco_funcionario) {
      const endereco = await this.enderecoRepository.findOne({
        where: { id_endereco_funcionario: updateInformacaoFuncionarioDto.id_endereco_funcionario },
      });
  
      if (!endereco) {
        throw new NotFoundException(`Endereço com ID ${updateInformacaoFuncionarioDto.id_endereco_funcionario} não encontrado`);
      }
  
      // Atualiza os dados do endereço, se fornecidos
      const { rua, numero, bairro, cidade, estado, cep } = updateInformacaoFuncionarioDto;
  
      await this.enderecoRepository.update(updateInformacaoFuncionarioDto.id_endereco_funcionario, {
        rua: rua ?? endereco.rua,
        numero: numero ?? endereco.numero,
        bairro: bairro ?? endereco.bairro,
        cidade: cidade ?? endereco.cidade,
        estado: estado ?? endereco.estado,
        cep: cep ?? endereco.cep,
      });
    }
  
    // Atualiza apenas as informações do funcionário
    await this.repository.update(id, {
      telefone: updateInformacaoFuncionarioDto.telefone,
      cpf: updateInformacaoFuncionarioDto.cpf,
      salario: updateInformacaoFuncionarioDto.salario,
      data_nascimento: updateInformacaoFuncionarioDto.data_nascimento?.toISOString().split('T')[0],
      data_cadastro: updateInformacaoFuncionarioDto.data_cadastro?.toISOString().split('T')[0],
      data_desligamento: updateInformacaoFuncionarioDto.data_desligamento?.toISOString().split('T')[0],
      ativo: updateInformacaoFuncionarioDto.ativo,
      id_endereco_funcionario: {
        id_endereco_funcionario: updateInformacaoFuncionarioDto.id_endereco_funcionario,
      } as EnderecoFuncionario, // Use o objeto se for necessário
    });
  
    return this.findOne(id);
  }
  
  
  

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Informação com ID ${id} não encontrada`);
    }
    return { message: `Informação com ID ${id} foi removida com sucesso` };
  }
}
