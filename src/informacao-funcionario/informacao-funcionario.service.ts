import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInformacaoFuncionarioDto } from './dto/create-informacao-funcionario.dto';
import { UpdateInformacaoFuncionarioDto } from './dto/update-informacao-funcionario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InformacaoFuncionario } from './entities/informacao-funcionario.entity';
import { Repository } from 'typeorm';
import { EnderecoFuncionario } from 'src/endereco_funcionario/entities/endereco_funcionario.entity';
import { DadosBancariosFuncionario } from 'src/dados-bancarios-funcionaario/entities/dados-bancarios-funcionaario.entity';

@Injectable()
export class InformacaoFuncionarioService {
  constructor(
    @InjectRepository(InformacaoFuncionario)
    private readonly repository: Repository<InformacaoFuncionario>,
    @InjectRepository(EnderecoFuncionario)
    private readonly enderecoRepository: Repository<EnderecoFuncionario>,
    @InjectRepository(DadosBancariosFuncionario) // Adicionando o repositório de dados bancários
    private readonly dadosBancariosRepository: Repository<DadosBancariosFuncionario>,
  ) { }

  async create(createInformacaoFuncionarioDto: CreateInformacaoFuncionarioDto) {
    // Verifica se o endereço já existe
    const enderecoExistente = await this.enderecoRepository.findOne({
      where: { rua: createInformacaoFuncionarioDto.id_endereco_funcionario.rua, numero: createInformacaoFuncionarioDto.id_endereco_funcionario.numero }
    });

    let endereco: EnderecoFuncionario;

    if (enderecoExistente) {
      endereco = enderecoExistente;
    } else {
      // Cria um novo endereço se não existir
      endereco = this.enderecoRepository.create(createInformacaoFuncionarioDto.id_endereco_funcionario);
      await this.enderecoRepository.save(endereco);
    }

    // Verifica se os dados bancários já existem
    const dadosBancariosExistentes = await this.dadosBancariosRepository.findOne({
      where: { banco: createInformacaoFuncionarioDto.id_dados_bancarios.banco, agencia: createInformacaoFuncionarioDto.id_dados_bancarios.agencia }
    });

    let dadosBancarios: DadosBancariosFuncionario;

    if (dadosBancariosExistentes) {
      dadosBancarios = dadosBancariosExistentes;
    } else {
      // Cria novos dados bancários se não existirem
      dadosBancarios = this.dadosBancariosRepository.create(createInformacaoFuncionarioDto.id_dados_bancarios);
      await this.dadosBancariosRepository.save(dadosBancarios);
    }

    // Cria a informação do funcionário
    const informacao = this.repository.create({
      ...createInformacaoFuncionarioDto,
      id_endereco_funcionario: endereco,
      id_dados_bancarios: dadosBancarios,
      data_nascimento: createInformacaoFuncionarioDto.data_nascimento.toISOString().split('T')[0],
      data_cadastro: createInformacaoFuncionarioDto.data_cadastro.toISOString().split('T')[0],
      data_desligamento: createInformacaoFuncionarioDto.data_desligamento?.toISOString().split('T')[0],
    });

    return await this.repository.save(informacao);
  }


  async findAll(): Promise<InformacaoFuncionario[]> {
    return await this.repository.find({ relations: ['id_endereco_funcionario', 'id_dados_bancarios'] });
  }

  async findOne(id: number): Promise<InformacaoFuncionario> {
    const informacao = await this.repository.findOne({ where: { id_informacoes_cadastro_funcionario: id }, relations: ['id_endereco_funcionario', 'id_dados_bancarios'] });
    if (!informacao) {
      throw new NotFoundException(`Informação com ID ${id} não encontrada`);
    }
    return informacao;
  }

  async update(id_informacoes_cadastro_funcionario: number, updateInformacaoFuncionarioDto: UpdateInformacaoFuncionarioDto) {
    const informacao = await this.findOne(id_informacoes_cadastro_funcionario);

    // Atualizar endereço
    if (updateInformacaoFuncionarioDto.id_endereco_funcionario) {
      const endereco = await this.enderecoRepository.findOne({
        where: { id_endereco_funcionario: informacao.id_endereco_funcionario.id_endereco_funcionario }
      });
      if (!endereco) {
        throw new NotFoundException(`Endereço com ID ${updateInformacaoFuncionarioDto.id_endereco_funcionario} não encontrado`);
      }

      await this.enderecoRepository.update(endereco.id_endereco_funcionario, {
        rua: updateInformacaoFuncionarioDto.id_endereco_funcionario.rua ?? endereco.rua,
        numero: updateInformacaoFuncionarioDto.id_endereco_funcionario.numero ?? endereco.numero,
        bairro: updateInformacaoFuncionarioDto.id_endereco_funcionario.bairro ?? endereco.bairro,
        cidade: updateInformacaoFuncionarioDto.id_endereco_funcionario.cidade ?? endereco.cidade,
        estado: updateInformacaoFuncionarioDto.id_endereco_funcionario.estado ?? endereco.estado,
        cep: updateInformacaoFuncionarioDto.id_endereco_funcionario.cep ?? endereco.cep,
      });
    }

    // Atualizar dados bancários
    if (updateInformacaoFuncionarioDto.id_dados_bancarios) {
      const dadosBancarios = await this.dadosBancariosRepository.findOne({
        where: { idDadosBancarios: informacao.id_dados_bancarios.idDadosBancarios }
      });

      if (!dadosBancarios) {
        throw new NotFoundException(`Dados bancários com ID ${updateInformacaoFuncionarioDto.id_dados_bancarios} não encontrados`);
      }

      await this.dadosBancariosRepository.update(dadosBancarios.idDadosBancarios, {
        banco: updateInformacaoFuncionarioDto.id_dados_bancarios.banco ?? dadosBancarios.banco,
        agencia: updateInformacaoFuncionarioDto.id_dados_bancarios.agencia ?? dadosBancarios.agencia,
        conta: updateInformacaoFuncionarioDto.id_dados_bancarios.conta ?? dadosBancarios.conta,
        tipoConta: updateInformacaoFuncionarioDto.id_dados_bancarios.tipoConta ?? dadosBancarios.tipoConta,
      });
    }

    // Atualizar informações do funcionário
    // Atualizar informações do funcionário
    await this.repository.update(id_informacoes_cadastro_funcionario, {
      telefone: updateInformacaoFuncionarioDto.telefone,
      cpf: updateInformacaoFuncionarioDto.cpf,
      salario: updateInformacaoFuncionarioDto.salario,
      data_nascimento: updateInformacaoFuncionarioDto.data_nascimento,
      data_cadastro: updateInformacaoFuncionarioDto.data_cadastro,
      data_desligamento: updateInformacaoFuncionarioDto.data_desligamento,
      ativo: updateInformacaoFuncionarioDto.ativo,
      id_endereco_funcionario: informacao.id_endereco_funcionario, // Mantenha o objeto EnderecoFuncionario
      id_dados_bancarios: informacao.id_dados_bancarios, // Mantenha o objeto DadosBancariosFuncionario
    });

    return this.findOne(id_informacoes_cadastro_funcionario);
  }





  async remove(id: number): Promise<{ message: string }> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Informação com ID ${id} não encontrada`);
    }
    return { message: `Informação com ID ${id} foi removida com sucesso` };
  }
}
