import * as z from 'zod';
import { AvailibleProvider } from 'shared/types';

const urls = {
  google: {
    // https://developers.google.com/youtube/v3/docs/channels#resource
    fetchAccountId: () => ({
      url: 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true',
      zod: z
        .object({ items: z.array(z.object({ id: z.string() })) })
        .transform((data) => ({ id: data.items[0].id })),
    }),
    // https://developers.google.com/youtube/v3/docs/search/list
    fetchVideos: (channelId: string) => ({
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video`,
      zod: z
        .object({
          items: z.array(
            z.object({
              id: z.object({ videoId: z.string() }),
              snippet: z.object({
                publishedAt: z.date(),
                title: z.string(),
                description: z.string(),
                thumbnails: z.record(
                  z.string(),
                  z.object({
                    url: z.string(),
                    width: z.number(),
                    height: z.number(),
                  })
                ),
              }),
            })
          ),
        })
        .transform(({ items }) =>
          items.map((item) => ({
            platform: 'google',
            publishedAt: item.snippet.publishedAt.toUTCString(),
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnails: item.snippet.thumbnails,
          }))
        ),
    }),
  },
  facebook: {
    fetchVideos: () => ({
      url: '',
      zod: z.object({}).transform((a) => [
        {
          platform: 'facebook',
          publishedAt: 'test',
          videoId: 'test',
          title: 'test',
          description: 'test',
          thumbnails: { test: { url: 'test', width: 100, height: 100 } },
        },
      ]),
    }),
    fetchAccountId: () => ({
      url: '',
      zod: z
        .object({ items: z.array(z.object({ id: z.string() })) })
        .transform((data) => ({ id: data.items[0].id })),
    }),
  },
  tiktok: {
    fetchVideos: () => ({
      url: '',
      zod: z.object({}).transform((a) => [
        {
          platform: 'facebook',
          publishedAt: 'test',
          videoId: 'test',
          title: 'test',
          description: 'test',
          thumbnails: { test: { url: 'test', width: 100, height: 100 } },
        },
      ]),
    }),
    fetchAccountId: () => ({
      url: '',
      zod: z
        .object({ items: z.array(z.object({ id: z.string() })) })
        .transform((data) => ({ id: data.items[0].id })),
    }),
  },
} as const;

export default urls;

type UrlsMethod = keyof (typeof urls)[AvailibleProvider];
export type ParsedFetchedVideoType<
  TProvider extends AvailibleProvider,
  TMethod extends UrlsMethod,
> = z.infer<ReturnType<(typeof urls)[TProvider][TMethod]>['zod']>;
