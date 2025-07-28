import { Injectable } from '@nestjs/common';
import { CreatePedidoXProductoDto } from './dto/create-pedido_x_producto.dto';
import { UpdatePedidoXProductoDto } from './dto/update-pedido_x_producto.dto';

@Injectable()
export class PedidoXProductoService {
  create(createPedidoXProductoDto: CreatePedidoXProductoDto) {
    return 'This action adds a new pedidoXProducto';
  }

  findAll() {
    return `This action returns all pedidoXProducto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedidoXProducto`;
  }

  update(id: number, updatePedidoXProductoDto: UpdatePedidoXProductoDto) {
    return `This action updates a #${id} pedidoXProducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedidoXProducto`;
  }
}
