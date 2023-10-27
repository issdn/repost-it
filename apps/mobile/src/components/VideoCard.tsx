import { View, Text, Image } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import dayjs from 'dayjs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Video } from 'api';
import ReuploadButton from './ReuploadButton';
import { HStack, VStack } from '@gluestack-ui/themed';

const StyledText = styled(Text);

const iconByProvider = {
  google: 'youtube',
  tiktok: 'tiktok',
  facebook: 'instagram',
} as const;

export default function VideoCard({
  title,
  publishedAt,
  platform,
  thumbnails,
}: Video) {
  const thumbnailsValues = Object.values(thumbnails);
  return (
    <HStack bg='$blue300' p='$1.5' rowGap='$1.5'>
      {thumbnailsValues[0] ? (
        <Image
          style={{ width: 50, height: 75 }}
          source={{ uri: thumbnailsValues[0].url }}
        />
      ) : (
        <Text>{thumbnailsValues[0]}</Text>
      )}
      <VStack flex={1}>
        <StyledText className='text-base text-ellipsis'>
          <StyledText className='font-bold '>Title:&nbsp;</StyledText>
          {title}
        </StyledText>

        <StyledText className='text-base text-ellipsis'>
          <StyledText className='font-bold'>Date:&nbsp;</StyledText>
          {dayjs(publishedAt).format('L')}
        </StyledText>
        {platform in iconByProvider ? (
          <FontAwesome5
            name={iconByProvider[platform as keyof typeof iconByProvider]}
            size={24}
          />
        ) : (
          <Text>{platform}</Text>
        )}
      </VStack>
      <ReuploadButton />
    </HStack>
  );
}
