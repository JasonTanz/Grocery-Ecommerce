import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { join } from 'path';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CustomerService } from './customer/customer.service';
import { DatabaseModule } from 'db/database.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      cors: true,
      context: ({ req }) => ({ req }),
    }),
    CustomerModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, CustomerService],
})
export class AppModule {}
