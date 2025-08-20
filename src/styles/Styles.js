import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#1e1e1e',
	justifyContent: 'center' 
  },
  headerContainer: {
	backgroundColor: '#1e1e1e',
	paddingHorizontal: 15,
	paddingBottom: 10
  },
  header: {
	fontSize: 28,
	fontWeight: 'bold',
	color: '#fff',
	marginBottom: 15,
	justifyContent: 'center',
	textAlign: 'center'
  },
  searchInput: {
	backgroundColor: '#333',
	color: '#fff',
	fontSize: 16,
	paddingHorizontal: 15,
	paddingVertical: 12,
	borderRadius: 10,
	marginTop: 5,
	marginBottom: 10,
	borderWidth: 1,
	borderColor: '#555',
  },
  emptyContainer: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	paddingVertical: 50,
  },
  emptyText: {
	color: '#999',
	fontSize: 16,
	textAlign: 'center',
  },
  stanceContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 20,
  width: '100%',          // tarvitaan, jotta space-around toimii
  paddingHorizontal: 40,  // reunoille vähän ilmaa
},

stanceButton: {
  paddingVertical: 15,
  paddingHorizontal: 25,
  backgroundColor: '#000',
  borderRadius: 12,
  marginHorizontal: 10,   // tämä varmistaa, että napit eivät ole kiinni
},
  stanceText: {
	color: '#fff',
	fontSize: 18,
	fontWeight: 'bold'
  },
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
  itemText: {
	fontSize: 16,
	color: '#fff'
  },
  backButton: {
	paddingVertical: 6,
	paddingHorizontal: 10,
	backgroundColor: '#000',
	borderRadius: 6,
	alignSelf: 'flex-start',
	marginBottom: 10,
	marginTop: 10, // Lisätty marginaali yläreunaan
  },
  backButtonText: {
	fontSize: 16,
	color: '#fff'
  },
  videoTitle: {
	fontSize: 20,
	fontWeight: 'bold',
	marginBottom: 10,
	color: '#fff',
	marginTop: 5
  },

  activityIndicator: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
  },
  topHeader: {
  paddingTop: 20,       // vähän tilaa yläreunaan
  paddingBottom: 10,
  alignItems: 'center', // keskittää otsikon
},

content: {
  flex: 1,
  justifyContent: 'center', // keskittää sisällön pystysuunnassa
  alignItems: 'center',
},

subHeader: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 20,
},
scrollContent: {
  padding: 16,
},

description: {
  fontSize: 16,
  color: '#fff',
  marginBottom: 20,
},

playButton: {
  backgroundColor: '#000',
  paddingVertical: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 20,
},

playButtonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},

webViewContainer: {
  height: 250,   // Ei vie koko ruutua
  borderRadius: 12,
  overflow: 'hidden',
  flex: 1,
  backgroundColor: '#1e1e1e',
  marginBottom: 20, // Vähän tilaa videon alle
},
});