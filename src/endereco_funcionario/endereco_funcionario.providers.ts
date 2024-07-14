import { EnderecoFuncionario } from 'src/endereco_funcionario/entities/endereco_funcionario.entity';
import { DataSource } from 'typeorm';

export const EnderecoFuncionarioProviders = [
  {
    provide: 'EnderecoFuncionario_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(EnderecoFuncionario),
    inject: ['DATA_SOURCE'],
  },
];