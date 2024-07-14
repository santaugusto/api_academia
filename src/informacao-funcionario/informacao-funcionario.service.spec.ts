import { Test, TestingModule } from '@nestjs/testing';
import { InformacaoFuncionarioService } from './informacao-funcionario.service';

describe('InformacaoFuncionarioService', () => {
  let service: InformacaoFuncionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformacaoFuncionarioService],
    }).compile();

    service = module.get<InformacaoFuncionarioService>(InformacaoFuncionarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
