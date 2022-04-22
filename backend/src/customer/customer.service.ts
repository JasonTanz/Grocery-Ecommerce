import { Inject, Injectable } from '@nestjs/common';
import { customer } from 'src/models/customer';
import { CreateCustomerInput } from './dto/create-customer.input';
import { CUST_REPOSITORY } from '../constants/index';
import { order } from 'src/models/order';
@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUST_REPOSITORY) private readonly custRepo: typeof customer,
  ) {}

  async findAll(): Promise<customer[]> {
    return await this.custRepo.findAll<customer>({
      include: [order],
    });
  }

  async findByEmail(email: string): Promise<customer> {
    return await this.custRepo.findOne<customer>({
      where: {
        cust_email: email,
      },
    });
  }

  async findById(id: string): Promise<customer> {
    const data = await this.custRepo.findOne({
      where: {
        cust_id: id,
      },
      include: [order],
    });

    return data;
  }

  async createCustomer(data: CreateCustomerInput): Promise<customer> {
    return await this.custRepo.create<customer>({
      cust_email: data.cust_email,
      cust_username: data.cust_username,
      cust_password: data.cust_password,
    });
  }
}
