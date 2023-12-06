import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExists";

@InputType()
export class RegisterInput {
  @Field()
  @Length(3, 50)
  name: string;

  @Field()
  @IsEmailAlreadyExist({message: "Email is already taken"})
  email: string;

  @Field()
  phoneNumber: number;

  @Field()
  password: string;
}
