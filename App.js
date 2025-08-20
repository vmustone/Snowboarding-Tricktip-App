import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StanceSelector from './src/components/StanceSelector';
import VideoList from './src/components/VideoList';
import VideoPlayer from './src/components/VideoPlayer';
import { styles } from './src/styles/Styles';

export default function App() {
  const [stance, setStance] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (selectedVideo) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <VideoPlayer video={selectedVideo} onBack={() => setSelectedVideo(null)} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (!stance) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StanceSelector onSelect={setStance} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <VideoList stance={stance} onBack={() => setStance(null)} onSelectVideo={setSelectedVideo} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
