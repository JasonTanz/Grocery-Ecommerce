import { Module } from '@nestjs/common';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';
import { customersProviders } from './customer.provider';
@Module({
  providers: [CustomerResolver, CustomerService, ...customersProviders],
  exports: [CustomerService, ...customersProviders],
})
export class CustomerModule {}
