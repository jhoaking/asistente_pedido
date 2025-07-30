import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidoXProducto } from 'src/pedido_x_producto/entities/pedido_x_producto.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
  imports : [TypeOrmModule.forFeature([Pedido,PedidoXProducto, Producto])],
  exports : [TypeOrmModule, PedidosService]
})
export class PedidosModule {}
