import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidoXProductoService } from './pedido_x_producto.service';
import { CreatePedidoXProductoDto } from './dto/create-pedido_x_producto.dto';
import { UpdatePedidoXProductoDto } from './dto/update-pedido_x_producto.dto';

@Controller('pedido-x-producto')
export class PedidoXProductoController {
  constructor(private readonly pedidoXProductoService: PedidoXProductoService) {}

  @Post()
  create(@Body() createPedidoXProductoDto: CreatePedidoXProductoDto) {
    return this.pedidoXProductoService.create(createPedidoXProductoDto);
  }

  @Get()
  findAll() {
    return this.pedidoXProductoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoXProductoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoXProductoDto: UpdatePedidoXProductoDto) {
    return this.pedidoXProductoService.update(+id, updatePedidoXProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoXProductoService.remove(+id);
  }
}
