import { v } from 'convex/values';
import { mutation } from '../_generated/server';
import { getOrCreateUser } from './user';

export const getReality = mutation({
  args: { id: v.id('realities') },
  handler: async (ctx, args) => {
    const reality = await ctx.db
      .query('realities')
      .withIndex('by_id', (q) => q.eq('_id', args.id))
      .first();

    if (!reality) {
      throw new Error('Reality not found');
    }

    return reality;
  },
});

export const getAllRealities = mutation({
  handler: async (ctx) => {
    const realities = await ctx.db.query('realities').collect();
    return realities;
  },
});

export const searchRealities = mutation({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const realities = await ctx.db
      .query('realities')
      .withSearchIndex('search_by_title', (q) =>
        q.search('metadata.title', args.query)
      )
      .collect();

    return realities;
  },
});

export const createReality = mutation({
  args: {
    address: v.string(),
    opinion: v.string(),
    title: v.string(),
    forkRealityTitle: v.string(),
    burnRealityTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getOrCreateUser(ctx, { address: args.address });

    const id = await ctx.db.insert('realities', {
      createdBy: user._id,
      opinion: args.opinion,
      metadata: {
        title: args.title,
        forkRealityTitle: args.forkRealityTitle,
        burnRealityTitle: args.burnRealityTitle,
      },
    });

    const newReality = await ctx.db.get(id);

    if (!newReality) {
      throw new Error('Reality not found');
    }

    return newReality;
  },
});
