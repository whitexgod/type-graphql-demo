import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  _id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: number;

  password: string;
}
