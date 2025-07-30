import { Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsOptional, IsPositive, IsString, Min, ValidateNested } from 'class-validator';
import { PedidoProductoDto } from './pedido-producto.dto';

export class CreatePedidoDto {
  @IsPositive()
  @IsOptional()
  precioTotal?: number;

  @IsDate()
  @IsOptional()
  fecha_pedido?: Date;

  @IsInt()
  @IsPositive()
  user_id: number;

  @IsArray()
  @ValidateNested({each : true})
  @Type(() =>PedidoProductoDto)
  pedidoProductos: PedidoProductoDto[];


}
