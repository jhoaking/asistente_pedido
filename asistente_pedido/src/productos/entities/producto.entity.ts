import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comidas' })
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
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
}
