import { Resolver, Query, Args } from '@nestjs/graphql';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer], { name: 'Customers' })
  // @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Customer[]> {
    return await this.customerService.findAll();
  }

  @Query(() => Customer, { name: 'Customer' })
  async findById(@Args('cust_id') cust_id: string) {
    return await this.customerService.findById(cust_id);
  }
}
