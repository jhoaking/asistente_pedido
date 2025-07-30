import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { Producto } from './entities/producto.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  private readonly logger = new Logger('ProductosService');

  constructor(
    @InjectRepository(Producto)
    private readonly producteRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const product = this.producteRepository.create(createProductoDto);
      await this.producteRepository.save(product);
      return product;
    } catch (error) {
      console.log(error);
      this.errorHandler(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.producteRepository.find({
      take: limit,
      skip: offset,
    });
    return products;
  }

  async findOne(id: number) {
    let product: Producto | null = null;

    product = await this.producteRepository.findOneBy({ id: id });
    if (!product) {
      throw new NotFoundException(`product with ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
   return 'product  was actialized'

  }

  async remove(id: number) {
    
    return 'product was remove '
  }

 

  private errorHandler(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'unexpected error check server logs!',
    );
  }
   async deleteAllProducts(){
    const query =  this.producteRepository.createQueryBuilder('prod');

      try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.errorHandler(error);
    }
  }
}
