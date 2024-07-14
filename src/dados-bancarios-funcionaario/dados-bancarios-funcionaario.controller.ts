import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DadosBancariosFuncionarioService } from './dados-bancarios-funcionaario.service';
import { CreateDadosBancariosFuncionaarioDto } from './dto/create-dados-bancarios-funcionaario.dto';
import { UpdateDadosBancariosFuncionaarioDto } from './dto/update-dados-bancarios-funcionaario.dto';

@Controller('dados-bancarios-funcionaario')
export class DadosBancariosFuncionaarioController {
  constructor(private readonly DadosBancariosFuncionarioService: DadosBancariosFuncionarioService) {}

  @Post()
  create(@Body() createDadosBancariosFuncionaarioDto: CreateDadosBancariosFuncionaarioDto) {
    return this.DadosBancariosFuncionarioService.create(createDadosBancariosFuncionaarioDto);
  }

  @Get()
  findAll() {
    return this.DadosBancariosFuncionarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.DadosBancariosFuncionarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDadosBancariosFuncionaarioDto: UpdateDadosBancariosFuncionaarioDto) {
    return this.DadosBancariosFuncionarioService.update(+id, updateDadosBancariosFuncionaarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.DadosBancariosFuncionarioService.remove(+id);
  }
}
