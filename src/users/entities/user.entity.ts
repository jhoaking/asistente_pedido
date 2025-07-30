import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  nombre: string;

  @Column('text')
  telefono: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany( 
    () => Pedido,
    (pedidoUser) => pedidoUser.usuario,
    {cascade : true , eager : true}
  )
  pedidos:Pedido[]
}
