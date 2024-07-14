import { Test, TestingModule } from '@nestjs/testing';
import { DadosBancariosFuncionaarioController } from './dados-bancarios-funcionaario.controller';
import { DadosBancariosFuncionarioService } from './dados-bancarios-funcionaario.service';

describe('DadosBancariosFuncionaarioController', () => {
  let controller: DadosBancariosFuncionaarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DadosBancariosFuncionaarioController],
      providers: [DadosBancariosFuncionarioService],
    }).compile();

    controller = module.get<DadosBancariosFuncionaarioController>(DadosBancariosFuncionaarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
