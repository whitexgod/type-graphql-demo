import { userModel } from "../../models/userModel";
import { User } from "../../entity/User";
import { Resolver, Query, Arg, Mutation } from "type-graphql";

@Resolver()
export class RemoveUserResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  // @Authorized()
  @Mutation(() => User)
  async deleteUser(@Arg("email") email: String) {
    const response = await userModel.findOneAndDelete({ email });
    return response;
  }
}
