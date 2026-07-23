import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Controller('api/pedidos')
export class PedidosController {
  constructor(private pedidosService: PedidosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePedidoDto, @Req() req: any) {
    return this.pedidosService.create(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mis-pedidos')
  findMine(@Req() req: any) {
    return this.pedidosService.findAllByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id/estado')
  updateEstado(@Param('id') id: string, @Body() dto: UpdateEstadoDto) {
    return this.pedidosService.updateEstado(+id, dto);
  }
}
