import { Resolver, Query, Mutation, Arg } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { userModel } from "../../models/userModel";
import { UserModel } from "../../interfaces/userModelInterface";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(
    @Arg("input") { name, email, phoneNumber, password }: RegisterInput
  ): // @Arg("name") name: string,
  // @Arg("email") email: string,
  // @Arg("phoneNumber") phoneNumber: number,
  // @Arg("password") password: string
  Promise<UserModel> {
    const hashPassword = await bcrypt.hash(password, 12);

    const user = new userModel({
      name,
      email,
      phoneNumber,
      password: hashPassword,
    }).save();

    return user;
  }
}
