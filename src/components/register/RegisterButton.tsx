import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';

interface RegisterButton {
  onPress: () => void;
  isLoading: boolean;
}

const RegisterButton = ({onPress, isLoading}: RegisterButton) => {
  return (
    <>
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
          <Text style={styles.btnText}>Register</Text>
        )}
      </Pressable>
    </>
  );
};

export default RegisterButton;

const styles = StyleSheet.create({
  btnContainer: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 15,
    width: '100%',
    backgroundColor: '#AAC8A7',
    borderRadius: 15,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
  },
});
