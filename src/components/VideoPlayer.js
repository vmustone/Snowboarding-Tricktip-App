import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useState } from 'react';
import { useVideoDescriptions } from '../hooks/UseVideoDescription';
import { getVideoDisplayName, findVideoDescription } from '../utils/videoNameParser';
import { styles } from '../styles/Styles';

export default function VideoPlayer({ video, onBack }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoKey, setVideoKey] = useState(0);
  const { descriptions, loading } = useVideoDescriptions();
  
  // Käytä älykästä haku-funktiota loading-tilan kanssa
  const description = findVideoDescription(video, descriptions, loading);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Takaisin</Text>
        </TouchableOpacity>
        <Text style={styles.videoTitle}>{getVideoDisplayName(video)}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        

        <TouchableOpacity style={styles.playButton} onPress={() => {
          if (showVideo) {
            // Jos video on jo näkyvissä, kasvata key:tä uudelleenlataamista varten
            setVideoKey(prev => prev + 1);
          } else {
            // Jos video ei ole näkyvissä, näytä se
            setShowVideo(true);
          }
        }}>
          <Text style={styles.playButtonText}>
            {showVideo ? "Toista uudelleen" : "Katso video"}
          </Text>
        </TouchableOpacity>

        {showVideo && (
          <WebView
            key={videoKey}
            style={styles.webViewContainer}
            javaScriptEnabled
            domStorageEnabled
            source={{ uri: `https://drive.google.com/file/d/${video.id}/preview` }}
          />
        )}
		<Text style={styles.description}>{description}</Text>
      </ScrollView>
    </View>
  );
}
