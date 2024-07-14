import { Test, TestingModule } from '@nestjs/testing';
import { InformacaoFuncionarioController } from './informacao-funcionario.controller';
import { InformacaoFuncionarioService } from './informacao-funcionario.service';

describe('InformacaoFuncionarioController', () => {
  let controller: InformacaoFuncionarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformacaoFuncionarioController],
      providers: [InformacaoFuncionarioService],
    }).compile();

    controller = module.get<InformacaoFuncionarioController>(InformacaoFuncionarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
