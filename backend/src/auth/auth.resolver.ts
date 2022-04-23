import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Customer } from 'src/customer/entities/customer.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { AuthService } from './auth.service';
import { LoginCustomerInput } from './dto/cust-dto/cust-login-input';
import { LoginAdminInput } from './dto/admin-dto/admin-login-input';
import { CustLoginResponse } from './dto/cust-dto/cust-login-response';
import { AdminLoginResponse } from './dto/admin-dto/admin-login-response';
import { SignUpCustInput } from './dto/cust-dto/cust-signup.input';
import { SignUpAdminInput } from './dto/admin-dto/admin-signup.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => CustLoginResponse)
  async custLogin(
    @Args('loginCustomerInput')
    loginCustomerInput: LoginCustomerInput,
  ): Promise<CustLoginResponse> {
    return await this.authService.custLogin(loginCustomerInput);
  }

  @Mutation(() => CustLoginResponse)
  async custSignup(@Args('signUpCustInput') signUpCustInput: SignUpCustInput) {
    return await this.authService.custSignup(signUpCustInput);
  }

  @Mutation(() => AdminLoginResponse)
  async adminLogin(
    @Args('loginAdminInput')
    loginAdminInput: LoginAdminInput,
  ): Promise<AdminLoginResponse> {
    return await this.authService.adminLogin(loginAdminInput);
  }

  @Mutation(() => Admin)
  async adminSignup(
    @Args('signUpAdminInput') signUpAdminInput: SignUpAdminInput,
  ) {
    return await this.authService.adminSignup(signUpAdminInput);
  }
}
