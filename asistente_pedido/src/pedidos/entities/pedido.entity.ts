import { PedidoXProducto } from "src/pedido_x_producto/entities/pedido_x_producto.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'pedidos' })
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  precioTotal: number;
  
  @CreateDateColumn()
  fecha_pedido: Date;

  @ManyToOne(() => User, 
  (user) => user.pedidos)
  @JoinColumn({ name: 'user_id' })
  usuario: User;

  @OneToMany(
    () =>PedidoXProducto,
    (pedidoProducto) =>pedidoProducto.pedido,
    {cascade : true , eager : true}
  )
  pedidoProductos : PedidoXProducto[]
}

