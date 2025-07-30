import { IsDate, IsString, MinLength } from "class-validator";



export class CreateUserDto {

    @IsString()
    @MinLength(1)
    nombre:string;

    
    @IsString()
    @MinLength(1)
    telefono:string;

    @IsDate()
    createdAt:Date
}
