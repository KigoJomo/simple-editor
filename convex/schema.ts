import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  articles: defineTable({
    title: v.string(),
    overview: v.string(),
    docId: v.string(),
  })
})
