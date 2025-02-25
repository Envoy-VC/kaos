import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export const conversationTables = {
  messages: defineTable({
    reality: v.id('realities'),
    sender: v.id('users'),
    content: v.string(),
    metadata: v.object({
      mentions: v.array(v.string()),
    }),
  })
    .index('by_reality', ['reality'])
    .index('by_sender', ['sender']),
};
