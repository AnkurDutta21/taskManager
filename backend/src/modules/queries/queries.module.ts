import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Query, QueryReply } from './entities/query.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Query, QueryReply])],
  exports: [TypeOrmModule],
})
export class QueriesModule {}
