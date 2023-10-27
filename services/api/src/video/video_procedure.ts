import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import * as z from 'zod';
import { providerSchema } from '../schemas';
import { get, fetchOauthAccessToken } from '../secure_fetch';
import urlBuilder from '../url_builders';
import { secureProcedure } from '../trpc';

type VideoResponseType = z.infer<
  ReturnType<(typeof urlBuilder)['google']['fetchVideos']>['zod']
>;

export default secureProcedure
  .input(z.object({ provider: providerSchema, accountId: z.string() }))
  .query(async () => {
    return [
      {
        platform: 'google',
        videoId: 'test',
        title: 'test',
        description: 'test',
        thumbnails: {
          test: { url: 'test', width: 100, height: 100 },
        },
        publishedAt: new Date().toUTCString(),
      },
    ] as VideoResponseType;
    // try {
    //   const { url, zod } = urlBuilder.google.fetchVideos(
    //     c.req.valid('param').accountId
    //   );
    //   const tokenObjectArray = await fetchOauthAccessToken(
    //     c.get('userId'),
    //     c.req.valid('param').provider
    //   );
    //   const res = await get(url, {}, tokenObjectArray[0].token);
    //   const data = await res.json();
    //   const parsed = zod.parse(data);
    //   return c.jsonT(parsed);
    // } catch (e) {
    //   return c.json({ error: e }, 500);
    // }
  });
export type { VideoResponseType };
