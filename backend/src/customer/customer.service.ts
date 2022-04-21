import { Inject, Injectable } from '@nestjs/common';
import { customer } from 'src/models/customer';
import { CreateCustomerInput } from './dto/create-customer.input';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUST_REPOSITORY') private readonly custRepo: typeof customer,
  ) {}

  async findAll(): Promise<customer[]> {
    return await this.custRepo.findAll<customer>({});
  }

  async findByEmail(email: string): Promise<customer> {
    return await this.custRepo.findOne<customer>({
      where: {
        cust_email: email,
      },
    });
  }

  async createCustomer(data: CreateCustomerInput): Promise<customer> {
    return await this.custRepo.create<customer>({
      cust_email: data.cust_email,
      cust_username: data.cust_username,
      cust_password: data.cust_password,
    });
  }
}
