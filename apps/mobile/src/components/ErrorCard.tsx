import { View, Text } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function ErrorCard({
  error,
  detail,
}: {
  error: string;
  detail: string;
}) {
  return (
    <StyledView className='p-4'>
      <StyledView className='bg-red-300 flex flex-col gap-y-2 px-2 pb-2 rounded-lg'>
        <MaterialIcons
          name='error'
          size={36}
          color='white'
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        />
        <StyledText className='font-bold text-xl'>{error}</StyledText>
        <StyledText className='text-base'>{detail}</StyledText>
      </StyledView>
    </StyledView>
  );
}
