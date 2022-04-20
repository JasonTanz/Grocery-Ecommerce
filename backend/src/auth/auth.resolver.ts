import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginCustomerInput } from './dto/login-input';
import { LoginResponse } from './dto/login-response';
import { GqlAuthGuard } from './gql-auth-guard';
import { CurrentUser } from './current-user.decorator';
import { Customer } from 'src/customer/entities/customer.entity';
@Resolver(() => LoginResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @CurrentUser() customer: Customer,
    @Args('loginCustomerInput')
    loginCustomerInput: LoginCustomerInput,
  ): Promise<LoginResponse> {
    return await this.authService.login(loginCustomerInput);
  }
}
