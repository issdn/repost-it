import { createClerkClient } from '@clerk/clerk-sdk-node';
import * as z from 'zod';
import { middleware } from '../trpc';
import { Context } from 'hono';
import config from '../config';
import { TRPCError } from '@trpc/server';

const clerk = createClerkClient({
  secretKey: config.clerkSecretKey,
  publishableKey: config.clerkPublishableKey,
});

export async function createContext({ req, res }: Context) {
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
