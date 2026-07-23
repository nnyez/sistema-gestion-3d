import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CotizacionesService } from './cotizaciones.service';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';

@Controller('api/cotizaciones')
export class CotizacionesController {
  constructor(private cotizacionesService: CotizacionesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateCotizacionDto, @Req() req: any) {
    return this.cotizacionesService.create(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mis-cotizaciones')
  findMine(@Req() req: any) {
    return this.cotizacionesService.findAllByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.cotizacionesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cotizacionesService.findOne(+id);
  }
}
