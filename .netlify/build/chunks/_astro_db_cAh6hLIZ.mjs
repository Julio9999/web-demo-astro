import { asDrizzleTable } from '@astrojs/db/runtime';
import { createClient } from '@astrojs/db/db-client/libsql-node.js';
import '@astrojs/db/dist/runtime/virtual.js';

const db = await createClient({
  url: "libsql://demo-julio9999.aws-us-east-1.turso.io",
  token: process.env.ASTRO_DB_APP_TOKEN
});
asDrizzleTable("Comment", { "columns": { "authorId": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "authorId", "collection": "Comment", "primaryKey": false, "optional": false, "references": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Author", "primaryKey": true } } } }, "body": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "body", "collection": "Comment", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);
asDrizzleTable("Author", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Author", "primaryKey": true } }, "name": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "name", "collection": "Author", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);
const Product = asDrizzleTable("Product", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Product", "primaryKey": true } }, "name": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "name", "collection": "Product", "primaryKey": false, "optional": false } }, "price": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "price", "collection": "Product", "primaryKey": false, "optional": false } }, "image": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "image", "collection": "Product", "primaryKey": false, "optional": false } }, "description": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "description", "collection": "Product", "primaryKey": false, "optional": true } } }, "deprecated": false, "indexes": {} }, false);

export { Product as P, db as d };
