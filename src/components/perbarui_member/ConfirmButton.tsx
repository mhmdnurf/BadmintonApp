import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface ConfirmButton {
  onPress: () => void;
}

const ConfirmButton = ({onPress}: ConfirmButton) => {
  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#8C9B8E' : '#AAC8A7',
              borderWidth: pressed ? 3 : 0,
              borderColor: pressed ? '#8C9B8E' : '#AAC8A7',
            },
            styles.button,
          ]}
          onPress={onPress}>
          <Text style={styles.buttonText}>Perbarui Member</Text>
        </Pressable>
      </View>
    </>
  );
};

export default ConfirmButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#AAC8A7',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins SemiBold',
  },
});
