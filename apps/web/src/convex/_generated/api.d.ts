/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as functions_conversations from "../functions/conversations.js";
import type * as functions_realities from "../functions/realities.js";
import type * as functions_user from "../functions/user.js";
import type * as tables_conversations from "../tables/conversations.js";
import type * as tables_core from "../tables/core.js";
import type * as tables_index from "../tables/index.js";
import type * as tables_realities from "../tables/realities.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "functions/conversations": typeof functions_conversations;
  "functions/realities": typeof functions_realities;
  "functions/user": typeof functions_user;
  "tables/conversations": typeof tables_conversations;
  "tables/core": typeof tables_core;
  "tables/index": typeof tables_index;
  "tables/realities": typeof tables_realities;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
