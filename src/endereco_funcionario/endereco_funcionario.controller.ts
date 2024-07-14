import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnderecoFuncionarioService } from './endereco_funcionario.service';
import { CreateEnderecoFuncionarioDto } from './dto/create-endereco_funcionario.dto';
import { UpdateEnderecoFuncionarioDto } from './dto/update-endereco_funcionario.dto';

@Controller('endereco-funcionario')
export class EnderecoFuncionarioController {
  constructor(private readonly enderecoFuncionarioService: EnderecoFuncionarioService) {}

  @Post()
  create(@Body() createEnderecoFuncionarioDto: CreateEnderecoFuncionarioDto) {
    return this.enderecoFuncionarioService.create(createEnderecoFuncionarioDto);
  }

  @Get()
  findAll() {
    return this.enderecoFuncionarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enderecoFuncionarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnderecoFuncionarioDto: UpdateEnderecoFuncionarioDto) {
    return this.enderecoFuncionarioService.update(+id, updateEnderecoFuncionarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enderecoFuncionarioService.remove(+id);
  }
}
