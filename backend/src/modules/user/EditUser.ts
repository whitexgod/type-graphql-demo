import { User } from "../../entity/User";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { userModel } from "../../models/userModel";

@Resolver()
export class EditUserResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Mutation(() => User)
  async editUser(
    @Arg("email") email: String,
    @Arg("name") name: String,
    @Arg("phoneNumber") phoneNumber: number
  ) {
    const response = await userModel.findOneAndUpdate(
      {
        email,
      },
      {
        name,
        phoneNumber,
      },
      {
        new: true,
      }
    );
    return response;
  }
}
