import { v } from 'convex/values';
import { api } from '../_generated/api';
import type { Id } from '../_generated/dataModel';
import { action, mutation, query } from '../_generated/server';
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
        api.functions.conversations.callSnickerdoodle,
        {
          realityId: args.realityId,
          content: args.content,
          address: args.address,
        }
      );
    }
  },
});

export const callSnickerdoodle = action({
  args: {
    realityId: v.id('realities'),
    content: v.string(),
    address: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runMutation(api.functions.user.getOrCreateUser, {
      address: args.address,
    });
    const res = await fetch(
      `${process.env.KAOS_AGENT_HOST}/c4fc38c7-224c-0721-b34d-e99a2edbabdf/message`,
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

    await ctx.runMutation(api.functions.conversations.addMessage, {
      realityId: args.realityId,
      // biome-ignore lint/nursery/noSecrets: not a secret
      sender: 'jd7dsenpt4m9390739r2b5envn7b0njv' as Id<'users'>,
      content: message.text,
      metadata: {
        mentions: [],
      },
    });
  },
});

export const addMessage = mutation({
  args: {
    realityId: v.id('realities'),
    content: v.string(),
    sender: v.id('users'),
    metadata: v.object({
      mentions: v.array(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('messages', {
      reality: args.realityId,
      sender: args.sender,
      content: args.content,
      metadata: {
        mentions: args.metadata.mentions,
      },
    });
  },
});

export const getMessages = query({
  args: { realityId: v.id('realities'), address: v.string() },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query('messages')
      .withIndex('by_reality', (q) => q.eq('reality', args.realityId))
      .collect();

    const data = [];
    for (const message of messages) {
      const sender = await ctx.db.get(message.sender);
      if (sender) {
        data.push({
          sender: {
            id: sender._id,
            type: sender.address === args.address ? 'me' : 'other',
            address: sender.address,
            username: sender.username,
          },
          content: message.content,
          metadata: message.metadata,
        });
      }
    }

    return data;
  },
});
