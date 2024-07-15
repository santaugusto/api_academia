import { Test, TestingModule } from '@nestjs/testing';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';

describe('FuncionarioController', () => {
  let controller: FuncionarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuncionarioController],
      providers: [FuncionarioService],
    }).compile();

    controller = module.get<FuncionarioController>(FuncionarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
