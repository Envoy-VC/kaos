import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export const realitiesTables = {
  realities: defineTable({
    createdBy: v.id('users'),
    opinion: v.string(),
    metadata: v.object({
      title: v.string(),
      forkRealityTitle: v.string(),
      burnRealityTitle: v.string(),
    }),
  })
    .index('by_creator', ['createdBy'])
    .searchIndex('search_by_title', {
      searchField: 'metadata.title',
    }),
};
