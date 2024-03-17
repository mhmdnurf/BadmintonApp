import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface PerpanjangButton {
  onPress: () => void;
}

const PerpanjangButton = ({onPress}: PerpanjangButton) => {
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Perbarui</Text>
        </Pressable>
      </View>
    </>
  );
};

export default PerpanjangButton;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
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
