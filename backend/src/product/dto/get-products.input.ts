import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetProductsInput {
  @Field({ nullable: true })
  keywords?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  page?: number;
}

@InputType()
export class SimilarProducts {
  @Field(() => [String])
  category_name: string[];
}
