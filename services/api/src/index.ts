import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { secureHeaders } from 'hono/secure-headers';
import { logger } from 'hono/logger';
import videoRouter from './video';
import { trpcServer } from '@hono/trpc-server';
import { router } from './trpc';
import userRouter from './user';
import { ParsedFetchedVideoType } from './url_builders';
import { AvailibleProvider } from 'shared/types';

const apiRouter = router({
  video: videoRouter,
  user: userRouter,
});

const app = new Hono().use('*', logger()).use(
  '*',
  secureHeaders({
    xFrameOptions: false,
  })
);
app.use(
  '/trpc/*',
  trpcServer({
    router: apiRouter,
  })
);

export type Video = ParsedFetchedVideoType<
  AvailibleProvider,
  'fetchVideos'
>[number];
export type ApiRouter = typeof apiRouter;

serve({ fetch: app.fetch, port: 3000 });
