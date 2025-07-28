import { PedidoXProducto } from 'src/pedido_x_producto/entities/pedido_x_producto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comidas' })
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text',{
    unique: true,
  })
  nombre: string;

  @Column('text', {
    nullable: true,
  })
  descripcion: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  categorias: string[];

  @OneToMany(
    () =>PedidoXProducto,
    (pedidoProducto) => pedidoProducto.producto)
    pedidoProductos : PedidoXProducto[]
}
