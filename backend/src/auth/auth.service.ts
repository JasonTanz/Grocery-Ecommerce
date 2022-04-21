import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { LoginCustomerInput } from './dto/cust-dto/cust-login-input';

import { CustLoginResponse } from './dto/cust-dto/cust-login-response';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/admin/entities/admin.entity';
import { AdminService } from 'src/admin/admin.service';
import { SignUpCustInput } from './dto/cust-dto/cust-signup.input';
import { LoginAdminInput } from './dto/admin-dto/admin-login-input';
import { AdminLoginResponse } from './dto/admin-dto/admin-login-response';
import { SignUpAdminInput } from './dto/admin-dto/admin-signup.input';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService,
    private readonly adminService: AdminService,
  ) {}

  async validateCustomer(
    email: string,
    password: string,
  ): Promise<Customer | null> {
    try {
      const customer = await this.customerService.findByEmail(email);
      if (customer !== null) {
        const valid = await bcrypt.compare(password, customer.cust_password);

        if (valid) {
          const { cust_password, ...result } = customer;
          return result;
        } else {
          throw new HttpException(
            {
              status: HttpStatus.UNAUTHORIZED,
              error: 'Incorrect Password or username',
            },
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateAdmin(email: string, password: string): Promise<Admin | null> {
    try {
      const admin = await this.adminService.findByEmail(email);
      if (admin) {
        const valid = await bcrypt.compare(password, admin.admin_password);
        if (valid) {
          const { admin_password, ...result } = admin;
          return result;
        } else {
          throw new HttpException(
            {
              status: HttpStatus.UNAUTHORIZED,
              error: 'Incorrect Password or username',
            },
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async custLogin(
    loginCustomerInput: LoginCustomerInput,
  ): Promise<CustLoginResponse> {
    try {
      const validateCustomer = await this.validateCustomer(
        loginCustomerInput.cust_email,
        loginCustomerInput.cust_password,
      );
      if (validateCustomer) {
        const { cust_email, cust_username, cust_id } =
          validateCustomer.dataValues;

        const data = {
          access_token: this.jwtService.sign({
            email: cust_email,
            sub: cust_id,
            role: 'cust',
          }),
          customer: {
            cust_email,
            cust_username,
            cust_id,
          },
        };
        return data;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async custSignup(signUpCustInput: SignUpCustInput) {
    try {
      const cust = await this.customerService.findByEmail(
        signUpCustInput.cust_email,
      );
      if (cust) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'User already Exists',
          },
          HttpStatus.CONFLICT,
        );
      } else {
        const password = await bcrypt.hash(signUpCustInput.cust_password, 10);
        return this.customerService.createCustomer({
          ...signUpCustInput,
          cust_password: password,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async adminLogin(
    loginAdminInput: LoginAdminInput,
  ): Promise<AdminLoginResponse> {
    try {
      const validateAdmin = await this.validateAdmin(
        loginAdminInput.admin_email,
        loginAdminInput.admin_password,
      );
      if (validateAdmin) {
        const { admin_email, admin_id, admin_username } =
          validateAdmin.dataValues;

        const data = {
          access_token: this.jwtService.sign({
            email: admin_email,
            sub: admin_id,
            role: 'admin',
          }),
          admin: {
            admin_email,
            admin_username,
            admin_id,
          },
        };
        return data;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async adminSignup(signUpAdminInput: SignUpAdminInput) {
    try {
      const admin = await this.adminService.findByEmail(
        signUpAdminInput.admin_email,
      );
      if (admin) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'User already Exists',
          },
          HttpStatus.CONFLICT,
        );
      } else {
        const password = await bcrypt.hash(signUpAdminInput.admin_password, 10);
        return this.adminService.createAdmin({
          ...signUpAdminInput,
          admin_password: password,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
