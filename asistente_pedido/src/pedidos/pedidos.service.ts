import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { User } from 'src/users/entities/user.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { PedidoXProducto } from 'src/pedido_x_producto/entities/pedido_x_producto.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { user_id } = createPedidoDto;

      
      const user = await queryRunner.manager.findOne(User, {
        where: { id: user_id },
      });


      if (!user) throw new NotFoundException(`user not found`);

      // calculamos el precio y preparamos la tabla intermedio de pedidos con productos
      let precioTotal = 0;
      const pedidoXProducto: PedidoXProducto[] = [];

      for (const product of createPedidoDto.pedidoProductos) {
        const producto = await queryRunner.manager.findOne(Producto, {
          where: { id: product.producto_id },
        });
        if (!producto)
          throw new NotFoundException(
            `product with ${product.producto_id} not found`,
          );

        precioTotal += producto.price * product.cantidad;

        const pedidoProducto = queryRunner.manager.create(PedidoXProducto, {
          producto,
          cantidad: product.cantidad,
          precioUnitario: producto.price,
        });
        pedidoXProducto.push(pedidoProducto);
        producto.stock -= product.cantidad;
        await queryRunner.manager.save(producto);
      }

      const pedido = queryRunner.manager.create(Pedido, {
        usuario : user,
        precioTotal,
        fecha_pedido :new Date(),
        pedidoProductos: pedidoXProducto,
      });

      await queryRunner.manager.save(pedido);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all pedidos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
