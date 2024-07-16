import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Funcionario } from './entities/funcionario.entity';
import { InformacaoFuncionario } from '../informacao-funcionario/entities/informacao-funcionario.entity';
import { EnderecoFuncionario } from 'src/endereco_funcionario/entities/endereco_funcionario.entity';
import { DadosBancariosFuncionario } from 'src/dados-bancarios-funcionaario/entities/dados-bancarios-funcionaario.entity';
import { Login } from 'src/login/entities/login.entity';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
    @InjectRepository(InformacaoFuncionario)
    private readonly informacaoFuncionarioRepository: Repository<InformacaoFuncionario>,
    @InjectRepository(EnderecoFuncionario)
    private readonly enderecoRepository: Repository<EnderecoFuncionario>,
    @InjectRepository(DadosBancariosFuncionario)
    private readonly dadosBancariosRepository: Repository<DadosBancariosFuncionario>,
    @InjectRepository(Login) // Injetando o repositório de Login
    private readonly loginRepository: Repository<Login>,
  ) {}

  async create(createFuncionarioDto: CreateFuncionarioDto): Promise<Funcionario> {
    const { informacoes_cadastro_funcionario, login, ...funcionarioData } = createFuncionarioDto;
  
    // Verifica se o login já existe
    const loginExistente = await this.loginRepository.findOne({ where: { email: login.email } });
    let loginSalvo: Login;
  
    if (loginExistente) {
      loginSalvo = loginExistente;
    } else {
      loginSalvo = this.loginRepository.create(login);
      await this.loginRepository.save(loginSalvo);
    }
  
    // Verifica se o endereço já existe
    const enderecoExistente = await this.enderecoRepository.findOne({
      where: {
        rua: informacoes_cadastro_funcionario.id_endereco_funcionario.rua,
        numero: informacoes_cadastro_funcionario.id_endereco_funcionario.numero,
      },
    });
  
    let endereco: EnderecoFuncionario;
  
    if (enderecoExistente) {
      endereco = enderecoExistente;
    } else {
      endereco = this.enderecoRepository.create(informacoes_cadastro_funcionario.id_endereco_funcionario);
      await this.enderecoRepository.save(endereco);
    }
  
    // Verifica se os dados bancários já existem
    const dadosBancariosExistentes = await this.dadosBancariosRepository.findOne({
      where: {
        banco: informacoes_cadastro_funcionario.id_dados_bancarios.banco,
        agencia: informacoes_cadastro_funcionario.id_dados_bancarios.agencia,
      },
    });
  
    let dadosBancarios: DadosBancariosFuncionario;
  
    if (dadosBancariosExistentes) {
      dadosBancarios = dadosBancariosExistentes;
    } else {
      dadosBancarios = this.dadosBancariosRepository.create(informacoes_cadastro_funcionario.id_dados_bancarios);
      await this.dadosBancariosRepository.save(dadosBancarios);
    }
  
    // Cria a informação do funcionário
    const informacao = this.informacaoFuncionarioRepository.create({
      ...informacoes_cadastro_funcionario,
      id_endereco_funcionario: endereco,
      id_dados_bancarios: dadosBancarios,
    });
  
    const informacaoSalva = await this.informacaoFuncionarioRepository.save(informacao);
  
    // Cria o funcionário
    const funcionario = this.funcionarioRepository.create({
      ...funcionarioData,
      informacoes_cadastro_funcionario: informacaoSalva,
      id_login: loginSalvo, // Corrigido para referenciar o objeto Login
    });
  
    return this.funcionarioRepository.save(funcionario); // Retornando um único Funcionario
  }
  


  findAll() {
    return this.funcionarioRepository.find();
  }

  findOne(id: number) {
    return this.funcionarioRepository.findOne({ where: { id_funcionario: id } });
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    const funcionario = await this.funcionarioRepository.findOne({ where: { id_funcionario: id } });
    if (!funcionario) {
      throw new Error('Funcionario not found');
    }
    Object.assign(funcionario, updateFuncionarioDto);
    return this.funcionarioRepository.save(funcionario);
  }

  async remove(id: number) {
    const funcionario = await this.funcionarioRepository.findOne({ where: { id_funcionario: id } });
    if (!funcionario) {
      throw new Error('Funcionario not found');
    }
    return this.funcionarioRepository.remove(funcionario);
  }
}
