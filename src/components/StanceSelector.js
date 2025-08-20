import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/Styles';

export default function StanceSelector({ onSelect }) {
  return (
	<View style={styles.container}>
		<Text style={styles.header}>Trick-tips</Text>
    <View style={styles.content}>
      <Text style={styles.subHeader}>Valitse Stance</Text>
      <View style={styles.stanceContainer}>
        <TouchableOpacity style={styles.stanceButton} onPress={() => onSelect('regular')}>
          <Text style={styles.stanceText}>Regular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stanceButton} onPress={() => onSelect('goofy')}>
          <Text style={styles.stanceText}>Goofy</Text>
        </TouchableOpacity>
      </View>
    </View>
	</View>
  );
}