import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class dataCat {
  @Field()
  category_id: string;

  @Field()
  category_name: string;
}
