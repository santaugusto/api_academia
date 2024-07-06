import { Test, TestingModule } from '@nestjs/testing';
import { FuncionariosService } from './funcionarios.service';

describe('FuncionariosService', () => {
  let service: FuncionariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuncionariosService],
    }).compile();

    service = module.get<FuncionariosService>(FuncionariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
