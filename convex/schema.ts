import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  
  users:defineTable({
    id:v.string(),
    username:v.string(),
    email:(v.string()),
    url:(v.string())

  }).index("by_username",["username"]).searchIndex("search_username",{searchField:"username"}),
  chats:defineTable({
    participants:v.array(v.string()),
    messages:v.array(v.object({msgId:(v.string()),msg:v.string(),sender:(v.string()),timestamp:(v.string())}))
  }).index("by_participants",["participants"])
});


