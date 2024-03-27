import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface PendingButton {
  onPress: () => void;
}

const PendingButton = ({onPress}: PendingButton) => {
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.btnContainer} onPress={onPress}>
          <Text style={styles.btnText}>Lakukan Nanti</Text>
        </Pressable>
      </View>
    </>
  );
};

export default PendingButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  btnContainer: {
    backgroundColor: '#B5C0D0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#DDDDDD',
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
    color: 'white',
  },
});
