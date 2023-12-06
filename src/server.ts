import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import connectDatabase from "./dbConnection";

import { RegisterResolver } from "./modules/user/Register";

const main = async () => {
  connectDatabase();

  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    // formatError: formatArgumentValidationError, // this lime is giving error don't know why
  });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/graphql`);
  });
};

main();
