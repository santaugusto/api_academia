import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoFuncionarioService } from './endereco_funcionario.service';

describe('EnderecoFuncionarioService', () => {
  let service: EnderecoFuncionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnderecoFuncionarioService],
    }).compile();

    service = module.get<EnderecoFuncionarioService>(EnderecoFuncionarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
