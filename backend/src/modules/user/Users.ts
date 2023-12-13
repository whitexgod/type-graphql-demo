import { userModel } from "../../models/userModel";
import { User } from "../../entity/User";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class UsersResolver {
  // @Authorized()
  @Query(() => [User])
  async users() {
    const allUsers = await userModel.find();
    return allUsers;
  }
}
