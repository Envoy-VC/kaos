import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export const coreTables = {
  users: defineTable({
    address: v.string(),
    username: v.optional(v.string()),
    avatar: v.optional(v.string()),
  })
    .index('by_username', ['username'])
    .index('by_address', ['address']),
};
