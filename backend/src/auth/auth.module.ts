import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CustomerModule } from 'src/customer/customer.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth-guard';
import { LocalStrategy } from './local.strategy';
require('dotenv').config();
@Module({
  imports: [
    CustomerModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  exports: [AuthService, JwtModule, GqlAuthGuard],
  providers: [AuthService, LocalStrategy, AuthResolver, GqlAuthGuard],
})
export class AuthModule {}
