import { Module } from '@nestjs/common';
import { adminsProvider } from './admin.provider';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';

@Module({
  providers: [AdminResolver, AdminService, ...adminsProvider],
  exports: [AdminService, ...adminsProvider],
})
export class AdminModule {}
