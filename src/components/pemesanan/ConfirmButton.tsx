import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface ConfirmButton {
  onPress: () => void;
  title: string;
  isLoading: boolean;
}

const ConfirmButton = ({onPress, title, isLoading}: ConfirmButton) => {
  return (
    <>
      <View style={styles.container}>
        <Pressable
          onPress={onPress}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#8C9B8E' : '#AAC8A7',
              borderWidth: pressed ? 3 : 0,
              borderColor: pressed ? '#8C9B8E' : '#AAC8A7',
            },
            styles.btnContainer,
          ]}>
          {isLoading ? (
            <ActivityIndicator size={25} color="white" />
          ) : (
            <Text style={styles.btnText}>{title}</Text>
          )}
        </Pressable>
      </View>
    </>
  );
};

export default ConfirmButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },
  btnContainer: {
    alignSelf: 'center',
    padding: 15,
    width: '100%',
    backgroundColor: '#AAC8A7',
    borderRadius: 10,
    elevation: 5,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins SemiBold',
    color: 'white',
  },
});
