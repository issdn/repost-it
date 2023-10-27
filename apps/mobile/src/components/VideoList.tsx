import { ScrollView } from 'react-native-gesture-handler';
import VideoCard from './VideoCard';
import { ActivityIndicator, Text } from 'react-native';
import { AvailibleProvider } from 'shared/types';
import { trpc } from '../trpc';

export default function VideoList({
  accountIds,
}: {
  accountIds: { [k in AvailibleProvider]?: string };
}) {
  const queries = trpc.useQueries((t) => {
    return Object.entries(accountIds).map((providerAndId) => {
      return t.video.list({
        provider: providerAndId[0] as AvailibleProvider,
        accountId: providerAndId[1],
      });
    });
  });

  const videos = queries.reduce<NonNullable<(typeof queries)[number]['data']>>(
    (acc, { data, error, isSuccess }) => {
      if (isSuccess && !error) {
        return [...acc, ...data];
      }
      return acc;
    },
    []
  );

  if (queries.every(({ isFetched }) => !isFetched)) {
    return <ActivityIndicator size='large' style={{ marginTop: 64 }} />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 8,
        paddingVertical: 8,
        paddingHorizontal: 8,
      }}
    >
      {videos.map((v) => (
        <VideoCard key={v.videoId} {...v} />
      ))}
    </ScrollView>
  );
}
