import { defineDb, defineTable, column } from 'astro:db';

const Author = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
  }
});

const Comment = defineTable({
  columns: {
    authorId: column.number({ references: () => Author.columns.id }),
    body: column.text(),
  }
});

const Product = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    price: column.number(),
    image: column.text(),
    description: column.text({ optional: true }),
  },
});



export default defineDb({
  tables: { Comment, Author, Product }
});
