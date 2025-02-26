import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export const transactionTables = {
  transactions: defineTable({
    reality: v.id('realities'),
    sender: v.id('users'),
    action: v.union(v.literal('fork'), v.literal('burn')),
    amount: v.number(),
  })
    .index('by_reality', ['reality'])
    .index('by_sender', ['sender']),
};
