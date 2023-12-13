import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExists";

@InputType()
export class RegisterInput {
  @Field()
  @Length(3, 50)
  name: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email is already taken" })
  email: string;

  @Field()
  phoneNumber: number;

  @Field()
  password: string;
}
