import { IsInt, IsPositive } from "class-validator";


export class PedidoProductoDto{

    @IsInt()
    @IsPositive()
    producto_id : number;

    @IsInt()
    @IsPositive()
    cantidad : number;

    
}