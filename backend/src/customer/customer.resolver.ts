import { Resolver, Query } from '@nestjs/graphql';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  customers(): Promise<Customer[]> {
    return this.customerService.findAll();
  }
}
