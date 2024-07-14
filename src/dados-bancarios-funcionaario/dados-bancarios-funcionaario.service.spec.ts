import { Test, TestingModule } from '@nestjs/testing';
import { DadosBancariosFuncionarioService } from './dados-bancarios-funcionaario.service';

describe('DadosBancariosFuncionarioService', () => {
  let service: DadosBancariosFuncionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DadosBancariosFuncionarioService],
    }).compile();

    service = module.get<DadosBancariosFuncionarioService>(DadosBancariosFuncionarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
