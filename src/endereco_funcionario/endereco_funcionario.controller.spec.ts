import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoFuncionarioController } from './endereco_funcionario.controller';
import { EnderecoFuncionarioService } from './endereco_funcionario.service';

describe('EnderecoFuncionarioController', () => {
  let controller: EnderecoFuncionarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnderecoFuncionarioController],
      providers: [EnderecoFuncionarioService],
    }).compile();

    controller = module.get<EnderecoFuncionarioController>(EnderecoFuncionarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
