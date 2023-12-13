import { userModel } from "../../models/userModel";
import { User } from "../../entity/User";
import { Resolver, Query, Arg } from "type-graphql";

@Resolver()
export class UserDetailsResolver {
  // @Authorized()
  @Query(() => User, { nullable: true })
  async userDetail(@Arg("email") email: string) {
    const response = await userModel.findOne({ email });
    return response;
  }
}
