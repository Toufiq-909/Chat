import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  numbers: defineTable({
    value: v.number(),
  }),
  users:defineTable({
    id:v.string(),
    username:v.string(),
    email:v.optional(v.string()),
    url:v.optional(v.string())

  }).index("by_username",["username"]).searchIndex("search_username",{searchField:"username"})
});
