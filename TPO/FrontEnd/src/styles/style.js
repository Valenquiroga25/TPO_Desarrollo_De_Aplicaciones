import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
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
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FFD600',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
