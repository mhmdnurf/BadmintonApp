import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';

interface ImageProfile {
  uri: string | undefined;
}

const ImageProfile = ({uri}: ImageProfile) => {
  return (
    <>
      <View style={styles.imageContainer}>
        {uri ? (
          <Image source={{uri: uri}} style={styles.image} />
        ) : (
          <ActivityIndicator size="large" color="#AAC8A7" />
        )}
      </View>
    </>
  );
};

export default ImageProfile;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 40,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 200,
    borderWidth: 10,
    borderColor: '#AAC8A7',
    resizeMode: 'cover',
  },
});
