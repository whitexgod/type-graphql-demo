import { MiddlewareFn } from "type-graphql";

export const LogAccess: MiddlewareFn = ({ args, info }, next) => {
  const username: string = args.name || "guest";
  console.log(
    `Logging access: ${username} -> ${info.parentType.name}.${info.fieldName}`
  );
  return next();
};
