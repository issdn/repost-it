import { Button, Icon } from '@gluestack-ui/themed';
import { Upload } from 'lucide-react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const download = async () => {};
const upload = async () => {
  FileSystem.createDownloadResumable(
    'https://www.youtube.com/shorts/UDbzL-XD_Bk',
    FileSystem.documentDirectory + 'repostit_file.mp4',
    {},
    (progress) => console.debug(progress.totalBytesWritten)
  )
    .downloadAsync()
    .then(async (res) => {
      if (res) {
        await MediaLibrary.createAssetAsync(res.uri);
        console.error('DONE');
      }
    });
};

export default function ReuploadButton() {
  return (
    <Button h='$full' onTouchEnd={upload}>
      <Icon size='xl' as={Upload} />
    </Button>
  );
}
