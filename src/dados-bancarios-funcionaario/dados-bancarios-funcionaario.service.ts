import { DadosBancariosFuncionario } from './entities/dados-bancarios-funcionaario.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DadosBancariosFuncionarioService {
  constructor(
    @InjectRepository(DadosBancariosFuncionario)
    private readonly repository: Repository <DadosBancariosFuncionario>,
  ) {}

  async create(data: Partial<DadosBancariosFuncionario>): Promise<DadosBancariosFuncionario> {
    const dadosBancarios = this.repository.create(data);
    return await this.repository.save(dadosBancarios);
  }

  async findAll(): Promise<DadosBancariosFuncionario[]> {
    return await this.repository.find();
  }

  async findOne(idDadosBancarios: number): Promise<DadosBancariosFuncionario> {
    return await this.repository.findOne({where:{idDadosBancarios}});
  }

  async update(idDadosBancarios: number, data: Partial<DadosBancariosFuncionario>): Promise<void> {
    await this.repository.update(idDadosBancarios, data);
  }

  async remove(idDadosBancarios: number): Promise<void> {
    await this.repository.delete(idDadosBancarios);
  }
}
