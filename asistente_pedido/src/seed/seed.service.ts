import { Injectable } from '@nestjs/common';
import { ProductosService } from 'src/productos/productos.service';
import { initialData } from './data/productos.data';


@Injectable()
export class SeedService {
 
    constructor(
      private readonly productosService : ProductosService
    ){}


    async runSeed(){
      await this.insertNewProduct()
      return 'SEED EXECUTED'
    }


    private async insertNewProduct(){
      await this.productosService.deleteAllProducts();

      const productos = initialData.comidas;

      const insertPromises : Promise<any>[] =[];
      
      
      productos.forEach( prod => {
        insertPromises.push(this.productosService.create(prod))
      })

      await Promise.all(insertPromises);

      return true;
    }
}
