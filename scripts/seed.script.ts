import * as schema from "../src/db/schema";
import { reset, seed } from "drizzle-seed";
import { db, pool } from "../src/db/db";

export const seedDatabase = async () => {
  await reset(db, schema);
  await seed(db, schema).refine((funcs) => ({
    usersTable: {
      columns: {
        age: funcs.int({ minValue: 18, maxValue: 80 }),
      },
      count: 10,
      with: {
        todosTable: 10,
      },
    },
    todosTable: {
      columns: {
        title: funcs.valuesFromArray({
          values: [
            "Buy groceries",
            "Walk the dog",
            "Finish project",
            "Call mom",
            "Read a book",
            "Exercise",
            "Cook dinner",
            "Clean the house",
            "Pay bills",
            "Plan vacation",
            "Write a blog post",
            "Learn a new skill",
            "Meditate",
            "Go for a run",
            "Watch a movie",
          ],
        }),
        description: funcs.valuesFromArray({
          values: [
            "Remember to buy milk, eggs, and bread.",
            "Take the dog for a walk in the park.",
            "Complete the project by the end of the week.",
            "Call mom to check in and say hi.",
            "Read 'The Great Gatsby' for book club.",
            "Do a 30-minute workout session.",
            "Cook a new recipe for dinner tonight.",
            "Clean the living room and kitchen.",
            "Pay the electricity and water bills.",
            "Plan a trip to the beach for the weekend.",
            "Write a blog post about your recent travels.",
            "Learn how to play the guitar online.",
            "Meditate for 10 minutes in the morning.",
            "Go for a 5k run in the neighborhood.",
            "Watch 'Inception' on Netflix.",
          ],
        }),
      },
    },
  }));
};

seedDatabase()
  .then(() => {
    console.log("Database seeded successfully");
    return pool.end();
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
    return pool.end();
  });
