import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { InventarioService } from './inventario.service';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('api/inventario')
export class InventarioController {
  constructor(private inventarioService: InventarioService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.inventarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id')
  updateStock(@Param('id') id: string, @Body() dto: UpdateStockDto) {
    return this.inventarioService.updateStock(+id, dto);
  }
}
