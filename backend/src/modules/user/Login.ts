import { User } from "../../entity/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { userModel } from "src/models/userModel";
import * as bcrypt from "bcryptjs";

@Resolver()
export class LoginResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    const user = await userModel.findOne({ email });
    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    return user;
  }
}
