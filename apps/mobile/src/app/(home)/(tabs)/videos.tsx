import React, { useState } from 'react';
import VideoList from '../../../components/VideoList';
import { useStore } from '../../../hooks/useStore';
import { ActivityIndicator, Text, Button } from 'react-native';

export default function Videos() {
  const { errors, isReading, values } = useStore(['google_id'], ['google']);

  if (isReading) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <VideoList
      accountIds={values.reduce(
        (acc, obj) => ({ ...acc, [obj.key]: obj.value }),
        {} as {
          [k in (typeof values)[number]['key']]: (typeof values)[number]['value'];
        }
      )}
    />
  );
}
