import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports : [TypeOrmModule.forFeature([User])],
  exports : [TypeOrmModule,UsersService]
})
export class UsersModule {}
