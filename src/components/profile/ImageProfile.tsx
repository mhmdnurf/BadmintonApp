import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

interface ImageProfile {
  uri: string | undefined;
  onPress?: () => void;
}

const ImageProfile = ({uri, onPress}: ImageProfile) => {
  return (
    <>
      <Pressable onPress={onPress}>
        <View style={styles.imageContainer}>
          {uri ? (
            <Image source={{uri: uri}} style={styles.image} />
          ) : (
            <ActivityIndicator size="large" color="#AAC8A7" />
          )}
        </View>
      </Pressable>
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
