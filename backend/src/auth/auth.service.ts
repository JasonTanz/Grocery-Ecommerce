import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { LoginCustomerInput } from './dto/login-input';
import { Logger } from '@nestjs/common';
import { LoginResponse } from './dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService,
  ) {}

  async validateCustomer(email: string, password: string): Promise<any> {
    const customer = await this.customerService.findByEmail(email);
    if (customer && customer.cust_password === password) {
      const { cust_password, ...result } = customer;
      return result;
    }

    return null;
  }

  async login(loginCustomerInput: LoginCustomerInput): Promise<LoginResponse> {
    const customer = await this.customerService.findByEmail(
      loginCustomerInput.cust_email,
    );
    Logger.log('Getting user information');
    const { cust_email, cust_username, cust_id } = customer;
    const data = {
      access_token: 'jwt',
      customer: {
        cust_email,
        cust_username,
        cust_id,
      },
    };
    return data;
  }

  // login(customer: Customer): { access_token: string } {
  //   const payload = {
  //     id: customer.cust_id,
  //     email: customer.cust_email,
  //     profile_pic: customer.cust_profile_pic,
  //     username: customer.cust_username,
  //   };

  //   return {
  //     access_token: this.jwtService.sign(payload, {
  //       secret: process.env.JWT_SECRET,
  //       expiresIn: process.env.JWT_EXPIRE_TIME,
  //     }),
  //   };
  // }

  // async verify(token: string): Promise<Customer> {
  //   const decoded = this.jwtService.verify(token, {
  //     secret: process.env.JWT_SECRET,
  //   });

  //   const customer = await this.customerService.findByEmail(decoded.email);

  //   if (!customer) {
  //     throw new Error('Failed to get user from decoded token');
  //   }

  //   return customer;
  // }

  // async googleLogin(data) {
  //   if (!data.user) throw new BadRequestException();

  //   const user: Customer = await this.customerService.findByEmail(
  //     data.user.email,
  //   );

  //   if (user) {
  //     console.log('User exists');
  //     return this.login(user);
  //   } else {
  //     console.log('User does not exist.. creating one');
  //     try {
  //       const newUser: Customer = await this.customerService.createCustomer(
  //         data.user,
  //       );

  //       return this.login(newUser);
  //     } catch (e) {
  //       throw new Error(e);
  //     }
  //   }
  // }
}
