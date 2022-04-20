import { MiddlewareFn } from "type-graphql";

export const ResolveTime: MiddlewareFn = async ({ info }, next) => {
  const result = await next();
  console.log('222222222222222222222', info)
  if (result === "typegql") {
    return "type-graphql";
  }
  return result;
};