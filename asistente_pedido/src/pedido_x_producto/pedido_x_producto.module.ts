import { Module } from '@nestjs/common';
import { PedidoXProductoService } from './pedido_x_producto.service';
import { PedidoXProductoController } from './pedido_x_producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoXProducto } from './entities/pedido_x_producto.entity';

@Module({
  controllers: [PedidoXProductoController],
  providers: [PedidoXProductoService],
  imports: [TypeOrmModule.forFeature([PedidoXProducto])],
  exports: [TypeOrmModule, PedidoXProductoService],
})
export class PedidoXProductoModule {}
