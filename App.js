import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { GOOGLE_DRIVE_API_KEY, GOOGLE_DRIVE_FOLDER_ID_GOOFY, GOOGLE_DRIVE_FOLDER_ID_REGULAR } from '@env';

function MainApp() {
  const insets = useSafeAreaInsets();
  const [stance, setStance] = useState(null); // null = ei valittu
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Haetaan videot vain kun stance valittu
  useEffect(() => {
    if (!stance) return;

    const fetchVideos = async () => {
      setLoading(true);
      try {
        // Erilliset folder ID:t stanceille
        const folderId = stance === 'regular' ? GOOGLE_DRIVE_FOLDER_ID_REGULAR : GOOGLE_DRIVE_FOLDER_ID_GOOFY;
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${GOOGLE_DRIVE_API_KEY}`;



        console.log("Valittu stance:", stance);
        console.log("Käytettävä folderId:", folderId);

        const res = await fetch(url);
        const data = await res.json();
        
        console.log('Fetching folder:', folderId, 'URL:', url);
        console.log('API response:', data);

        setVideos(data.files || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [stance]);

  // Näytetään video
  if (selectedVideo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedVideo(null)}>
            <Text style={styles.backButtonText}>← Takaisin</Text>
          </TouchableOpacity>
          <Text style={styles.videoTitle}>{selectedVideo.name}</Text>
        </View>
        <WebView
          style={styles.webViewContainer}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: `https://drive.google.com/file/d/${selectedVideo.id}/preview` }}
        />
      </SafeAreaView>
    );
  }

  // Jos stance ei valittu, näytetään valinta
  if (!stance) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Valitse Stance</Text>
        <View style={styles.stanceContainer}>
          <TouchableOpacity style={styles.stanceButton} onPress={() => setStance('regular')}>
            <Text style={styles.stanceText}>Regular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stanceButton} onPress={() => setStance('goofy')}>
            <Text style={styles.stanceText}>Goofy</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // stance valittu → näytetään lista
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => setStance(null)}>
          <Text style={styles.backButtonText}>← Takaisin</Text>
        </TouchableOpacity>
        <Text style={styles.header}>{stance === 'regular' ? 'Regular' : 'Goofy'} Videot</Text>
      </View>
      {loading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 15 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => setSelectedVideo(item)}>
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e1e', justifyContent: 'center' },
  headerContainer: { backgroundColor: '#1e1e1e', paddingHorizontal: 15, paddingBottom: 10 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 15, justifyContent: 'center', textAlign: 'center' },
  stanceContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  stanceButton: { paddingVertical: 15, paddingHorizontal: 25, backgroundColor: '#000', borderRadius: 12 },
  stanceText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  item: {
    padding: 15,
    backgroundColor: '#333',
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
  },
  itemText: { fontSize: 16, color: '#fff' },
  backButton: { paddingVertical: 6, paddingHorizontal: 10, backgroundColor: '#000', borderRadius: 6, alignSelf: 'flex-start', marginBottom: 10 },
  backButtonText: { fontSize: 16, color: '#fff' },
  videoTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#fff', marginTop: 5 },
  webViewContainer: { flex: 1, backgroundColor: '#1e1e1e' },
  activityIndicator: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
