import * as z from 'zod';
import { secureProcedure } from '../trpc';
import { providerSchema } from '../schemas';
import urlBuilder from '../url_builders';
import config from '../config';
import { fetchOauthAccessToken, get } from '../secure_fetch';
import { TRPCError } from '@trpc/server';

export default secureProcedure
  .input(
    z.object({
      provider: providerSchema,
    })
  )
  .query(async ({ ctx, input }) => {
    const { provider } = input;
    const { user } = ctx;
    const { url, zod } = await urlBuilder[provider].fetchAccountId();
    const tokenObjectArray = await fetchOauthAccessToken(user.id, provider);
    const res = await get(
      url,
      { key: config.googleApiKey },
      tokenObjectArray[0].token
    );
    if (!res.ok) {
      throw new TRPCError({
        message: `Could not fetch ${provider}'s account id.`,
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
    const data = await res.json();
    return zod.parse(data);
  });
