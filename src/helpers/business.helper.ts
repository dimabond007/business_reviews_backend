import { FilterQuery } from "mongoose";
import QueryString from "qs";
import Business from "../models/Business";

export function buildCriteria(
  query: QueryString.ParsedQs
): FilterQuery<typeof Business> {
  const criteria: FilterQuery<typeof Business> = {};

  if (query.name) {
    criteria.name = { $regex: query.name, $options: "i" };
  }

  return criteria;
}
