import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { User } from 'src/users/entities/user.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { PedidoXProducto } from 'src/pedido_x_producto/entities/pedido_x_producto.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,

    @InjectRepository(PedidoXProducto)
    private readonly pedidoXProductoRepository: Repository<PedidoXProducto>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { user_id, pedidoProductos: productosPedido } = createPedidoDto;

      const user = await queryRunner.manager.findOne(User, {
        where: { id: user_id },
      });
      if (!user) throw new NotFoundException('User not found');

      let precioTotal = 0;
      const pedidoXProductos: PedidoXProducto[] = [];

      for (const prod of productosPedido) {
        const producto = await queryRunner.manager.findOne(Producto, {
          where: { id: prod.producto_id },
        });
        if (!producto)
          throw new NotFoundException(
            `Producto con id ${prod.producto_id} no encontrado`,
          );

        if (producto.stock < prod.cantidad)
          throw new BadRequestException(
            `Stock insuficiente para producto ${producto.nombre}`,
          );

        // Actualizar stock
        producto.stock -= prod.cantidad;
        await queryRunner.manager.save(producto);

        const pedidoXProd = this.pedidoXProductoRepository.create({
          producto,
          cantidad: prod.cantidad,
          precioUnitario: producto.price,
        });

        precioTotal += producto.price * prod.cantidad;
        pedidoXProductos.push(pedidoXProd);
      }

      const pedido = this.pedidoRepository.create({
        usuario: user,
        precioTotal,
        fecha_pedido: new Date(),
        pedidoProductos: pedidoXProductos,
      });

      await queryRunner.manager.save(pedido);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return pedido;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const pedidos = await this.pedidoRepository.find({
      take: limit,
      skip: offset,
      relations: {
        pedidoProductos: { producto: true },
        usuario: true,
      },
    });

    return pedidos.map((pedido) => ({
      id: pedido.id,
      precioTotal: pedido.precioTotal,
      fecha_pedido: pedido.fecha_pedido,
      usuario: pedido.usuario?.nombre ?? 'Usuario desconocido',
      pedidoProductos: pedido.pedidoProductos
        .filter((pedi) => pedi.producto)
        .map((pedi) => ({
          nombre: pedi.producto.nombre,
          cantidad: pedi.cantidad,
        })),
    }));
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: {
        pedidoProductos: {
          producto: true,
        },
        usuario: true,
      },
    });
    if (!pedido) throw new NotFoundException(`pedido with ${id} not found`);

    return pedido;
  }

  async findOnePlain(id: number) {
    const { pedidoProductos = [], usuario, ...rest } = await this.findOne(id);

    return {
      ...rest,
      usuario: usuario.nombre,
      pedidoProductos: pedidoProductos.map((pedi) => ({
        nombre: pedi.producto.nombre,
        cantidad: pedi.cantidad,
      })),
    };
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const { pedidoProductos = [], ...restToUpdate } = updatePedidoDto;

    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: {
        pedidoProductos: { producto: true },
      },
    });

    if (!pedido) throw new NotFoundException(`product with ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const pedi of pedido.pedidoProductos) {
        pedi.producto.stock += pedi.cantidad;
        await queryRunner.manager.save(pedi.producto);
      }

      await queryRunner.manager.remove(PedidoXProducto, pedido.pedidoProductos);

      let nuevoPrecio = 0;
      const nuevoPedidoXProducto: PedidoXProducto[] = [];

      for (const producto of pedidoProductos) {
        const itemProducto = await this.productoRepository.findOneBy({
          id: producto.producto_id,
        });
        if (!itemProducto) {
          throw new NotFoundException(
            `Producto with id ${producto.producto_id} not found`,
          );
        }
        itemProducto.stock -= producto.cantidad;

        await queryRunner.manager.save(itemProducto);

        const newPedidoXProducto = this.pedidoXProductoRepository.create({
          producto: itemProducto,
          cantidad: producto.cantidad,
          precioUnitario: itemProducto.price,
        });

        nuevoPrecio += producto.cantidad * itemProducto.price;
        nuevoPedidoXProducto.push(newPedidoXProducto);
      }

      pedido.pedidoProductos =
        await queryRunner.manager.save(nuevoPedidoXProducto);
      pedido.precioTotal = nuevoPrecio;
      pedido.fecha_pedido = new Date();

      await queryRunner.manager.save(pedido);

      await queryRunner.commitTransaction();
      return pedido;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      console.log(error);
      throw new InternalServerErrorException('Error al actualizar el pedido');
    }
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const pedi of pedido.pedidoProductos) {
        pedi.producto.stock += pedi.cantidad;
        await queryRunner.manager.save(pedi.producto);
      }

      await queryRunner.manager.remove(PedidoXProducto, pedido.pedidoProductos);

      await queryRunner.manager.remove(Pedido, pedido);

      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar el pedido');
    }
  }
}
