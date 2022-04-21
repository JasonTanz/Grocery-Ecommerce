import { Resolver, Query } from '@nestjs/graphql';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  @UseGuards(JwtAuthGuard)
  customers(): Promise<Customer[]> {
    return this.customerService.findAll();
  }
}
