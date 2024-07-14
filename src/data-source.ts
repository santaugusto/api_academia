import { DataSource } from 'typeorm';
import { DadosBancariosFuncionario } from './dados-bancarios-funcionaario/entities/dados-bancarios-funcionaario.entity';
import { EnderecoFuncionario } from './endereco_funcionario/entities/endereco_funcionario.entity';
import { InformacaoFuncionario } from './informacao-funcionario/entities/informacao-funcionario.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [DadosBancariosFuncionario, EnderecoFuncionario, InformacaoFuncionario],
  migrations: ['./src/migration/**/*.ts'],
});
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
