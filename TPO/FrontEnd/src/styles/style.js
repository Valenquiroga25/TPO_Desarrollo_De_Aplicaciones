import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 65,
    marginTop: 15,
  },
  dengueImage: {
    width: 280,
    height: 170,
    marginTop: 15,
  },
  buttonWrapper: {
    padding: 40,
  },
  button: {
    backgroundColor: '#FFD600',
    height:60,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
