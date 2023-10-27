import { initTRPC } from '@trpc/server';
import { createClerkClient } from '@clerk/clerk-sdk-node';
import * as z from 'zod';
import { Context as HonoContext } from 'hono';
import config from './config';
import { TRPCError } from '@trpc/server';

export interface Context {
  user?: {
    userId: string;
  };
}

const clerk = createClerkClient({
  secretKey: config.clerkSecretKey,
  publishableKey: config.clerkPublishableKey,
});

export async function createTRPCContext({ req }: HonoContext) {
  try {
    const bearer = z
      .object({
        bearer: z.string().regex(/\bBearer\s+([A-Za-z0-9\-._~+/]+=*)\b/i),
      })
      .parse({
        bearer: req.header('Authorization'),
      })
      .bearer.substring(7);
    const user = await clerk.users.getUser(bearer);
    return await { user };
  } catch (e) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create();
export const middleware = t.middleware;
export const secureProcedure = t.procedure;
export const { router } = t;
