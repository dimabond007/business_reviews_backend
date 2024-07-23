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

  if (query.category) {
    criteria.category = { $regex: query.category, $options: "i" };
  }

  if (query.district) {
    criteria.district = { $regex: query.district, $options: "i" };
  }

  return criteria;
}
