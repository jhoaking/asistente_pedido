import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './productos/productos.module';
import { CommonModule } from './common/common.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { UsersModule } from './users/users.module';
import { PedidoXProductoModule } from './pedido_x_producto/pedido_x_producto.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductosModule,
    CommonModule,
    PedidosModule,
    UsersModule,
    PedidoXProductoModule,
 

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
