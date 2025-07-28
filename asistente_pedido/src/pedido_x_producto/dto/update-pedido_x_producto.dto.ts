import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoXProductoDto } from './create-pedido_x_producto.dto';

export class UpdatePedidoXProductoDto extends PartialType(CreatePedidoXProductoDto) {}
