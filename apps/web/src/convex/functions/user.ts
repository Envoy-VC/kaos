import { v } from 'convex/values';
import { mutation } from '../_generated/server';

export const getOrCreateUser = mutation({
  args: { address: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_address', (q) => q.eq('address', args.address))
      .first();

    if (user) {
      return user;
    }

    const id = await ctx.db.insert('users', {
      address: args.address,
    });

    const newUser = await ctx.db.get(id);

    if (!newUser) {
      throw new Error('User not found');
    }

    return newUser;
  },
});
