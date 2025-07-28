import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
  imports : [TypeOrmModule.forFeature([Pedido])],
  exports : [TypeOrmModule, PedidosService]
})
export class PedidosModule {}
