import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { useVideos } from '../hooks/UseVideos';
import { getVideoDisplayName } from '../utils/videoNameParser';
import { useState, useMemo } from 'react';
import { styles } from '../styles/Styles';

export default function VideoList({ stance, onBack, onSelectVideo }) {
  const { videos, loading } = useVideos(stance);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtteröi videot hakutermin perusteella
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) {
      return videos;
    }
    
    return videos.filter(video => {
      const displayName = getVideoDisplayName(video).toLowerCase();
      const originalName = video.name.toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      
      return displayName.includes(query) || originalName.includes(query);
    });
  }, [videos, searchQuery]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Takaisin</Text>
        </TouchableOpacity>
        <Text style={styles.header}>{stance === 'regular' ? 'Regular' : 'Goofy'} Videot</Text>
        
        {/* Hakukenttä */}
        <TextInput
          style={styles.searchInput}
          placeholder="Etsi videoita..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      {loading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          data={filteredVideos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => onSelectVideo(item)}>
              <Text style={styles.itemText}>{getVideoDisplayName(item)}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchQuery ? 'Ei videoita hakuehdolla' : 'Ei videoita saatavilla'}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
