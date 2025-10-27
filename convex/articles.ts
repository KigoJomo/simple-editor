import { components } from "./_generated/api";
import { ProsemirrorSync } from "@convex-dev/prosemirror-sync";

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

import { slugifyUnique } from "../lib/utils";

const prosemirrorSync = new ProsemirrorSync(components.prosemirrorSync);
export const {
  getSnapshot,
  submitSnapshot,
  latestVersion,
  getSteps,
  submitSteps,
} = prosemirrorSync.syncApi();

export const getArticles = query({
  handler: async (ctx) => {
    const articles = await ctx.db.query("articles").collect();
    return articles;
  },
});

export const getArticleById = query({
  args: {
    id: v.id("articles"),
  },
  handler: async (ctx, { id }) => {
    const article = await ctx.db.get(id);
    return article;
  },
});

export const createArticle = mutation({
  args: {
    title: v.string(),
    overview: v.string(),
  },
  handler: async (ctx, args) => {
    const { title, overview } = args;
    const articleSlug = slugifyUnique(title);

    const newArticle = await ctx.db.insert("articles", {
      overview,
      title,
      docId: articleSlug,
    });

    return {
      articleSlug,
      newArticle,
    };
  },
});
