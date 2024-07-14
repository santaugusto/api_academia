import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformacaoFuncionarioService } from './informacao-funcionario.service';
import { CreateInformacaoFuncionarioDto } from './dto/create-informacao-funcionario.dto';
import { UpdateInformacaoFuncionarioDto } from './dto/update-informacao-funcionario.dto';

@Controller('informacao-funcionario')
export class InformacaoFuncionarioController {
  constructor(private readonly informacaoFuncionarioService: InformacaoFuncionarioService) {}

  @Post()
  create(@Body() createInformacaoFuncionarioDto: CreateInformacaoFuncionarioDto) {
    return this.informacaoFuncionarioService.create(createInformacaoFuncionarioDto);
  }

  @Get()
  findAll() {
    return this.informacaoFuncionarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informacaoFuncionarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformacaoFuncionarioDto: UpdateInformacaoFuncionarioDto) {
    return this.informacaoFuncionarioService.update(+id, updateInformacaoFuncionarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informacaoFuncionarioService.remove(+id);
  }
}
