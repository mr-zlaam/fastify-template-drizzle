import { defineConfig } from "drizzle-kit";
import process from "node:process";
export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schemas/**/*.ts",

  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URI as string
  },
  migrations: {
    prefix: "index",
    table: "__drizzle_migrations__",
    schema: "public"
  }
});
