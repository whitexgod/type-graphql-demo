import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import connectDatabase from "./databaseConnection";

import { RegisterResolver } from "./modules/user/Register";
import { UsersResolver } from "./modules/user/Users";
import { UserDetailsResolver } from "./modules/user/UserDetail";
import { RemoveUserResolver } from "./modules/user/RemoveUser";
import { EditUserResolver } from "./modules/user/EditUser";

const main = async () => {
  connectDatabase();

  const schema = await buildSchema({
    resolvers: [
      RegisterResolver,
      UsersResolver,
      UserDetailsResolver,
      RemoveUserResolver,
      EditUserResolver,
    ],
    authChecker: ({ context: { req } }) => {
      if (req.headers.app === "ADMIN") {
        return true;
      }
      return false;
    },
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    context: ({ req }) => ({ req }),
  });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  const PORT = 4040;

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/graphql`);
  });
};

main();
