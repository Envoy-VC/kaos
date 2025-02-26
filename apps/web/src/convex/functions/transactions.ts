import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';

export const getTransactions = query({
  args: { reality: v.id('realities') },
  handler: async (ctx, args) => {
    const transactions = await ctx.db
      .query('transactions')
      .withIndex('by_reality', (q) => q.eq('reality', args.reality))
      .collect();

    const data = [];

    let currentTotalForkedAmount = 0;
    let currentTotalBurnedAmount = 0;

    for await (const transaction of transactions) {
      const user = await ctx.db.get(transaction.sender);
      if (user) {
        if (transaction.action === 'fork') {
          currentTotalForkedAmount += transaction.amount;
        } else {
          currentTotalBurnedAmount += transaction.amount;
        }

        data.push({
          id: transaction._id,
          amount: transaction.amount,
          reality: transaction.reality,
          action: transaction.action,
          sender: {
            ...user,
          },
          totalForkedAmount: currentTotalForkedAmount,
          totalBurnedAmount: currentTotalBurnedAmount,
          createdAt: transaction._creationTime,
        });
      }
    }

    return data;
  },
});

export const addTransaction = mutation({
  args: {
    reality: v.id('realities'),
    sender: v.string(),
    action: v.union(v.literal('fork'), v.literal('burn')),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_address', (q) => q.eq('address', args.sender))
      .first();
    if (user) {
      const transaction = await ctx.db.insert('transactions', {
        reality: args.reality,
        sender: user._id,
        action: args.action,
        amount: args.amount,
      });
      return transaction;
    }
  },
});
