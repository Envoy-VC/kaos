import { v } from 'convex/values';
import { internal } from '../_generated/api';
import type { Id } from '../_generated/dataModel';
import { internalMutation, mutation } from '../_generated/server';
import { getOrCreateUser } from './user';

export const sendMessage = mutation({
  args: {
    realityId: v.id('realities'),
    content: v.string(),
    address: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getOrCreateUser(ctx, { address: args.address });

    const mentionRegex = /@([a-zA-Z0-9_]+)/g;
    const mentions = [...args.content.matchAll(mentionRegex)]
      .map((match) => match[1])
      .filter((mention) => mention !== undefined);

    const filteredMentions = mentions.filter(
      (mention) => mention.trim().length > 0
    );

    const message = await ctx.db.insert('messages', {
      reality: args.realityId,
      sender: user._id,
      content: args.content,
      metadata: {
        mentions: filteredMentions,
      },
    });

    if (filteredMentions.includes('snickerdoodle')) {
      await ctx.scheduler.runAfter(
        100,
        internal.functions.conversations.callSnickerdoodle,
        {
          realityId: args.realityId,
          content: args.content,
          address: args.address,
        }
      );
    }
  },
});

export const callSnickerdoodle = internalMutation({
  args: {
    realityId: v.id('realities'),
    content: v.string(),
    address: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getOrCreateUser(ctx, { address: args.address });
    const res = await fetch(
      'http://localhost:3002/c4fc38c7-224c-0721-b34d-e99a2edbabdf/message',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: args.content,
          userId: user.address,
          roomId: args.realityId,
        }),
      }
    );
    const data = (await res.json()) as {
      user: string;
      text: string;
      action: 'NONE' | 'CONTINUE';
    }[];

    const message = data[0];

    if (!message) return;

    await ctx.db.insert('messages', {
      reality: args.realityId,
      // biome-ignore lint/nursery/noSecrets: not a secret
      sender: 'jd7dsenpt4m9390739r2b5envn7b0njv' as Id<'users'>,
      content: message.text,
      metadata: {
        mentions: [],
      },
    });
  },
});
