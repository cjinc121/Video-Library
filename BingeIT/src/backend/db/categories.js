import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Computer Programming",
  },
  {
    _id: uuid(),
    categoryName: "Frontend Development",
  },
  {
    _id: uuid(),
    categoryName: "Vlogs",
  },
  {
    _id: uuid(),
    categoryName: "International Relation",
  },
  {
    _id: uuid(),
    categoryName: "Drama",
  },
  {
    _id: uuid(),
    categoryName: "Workout",
  },
];
