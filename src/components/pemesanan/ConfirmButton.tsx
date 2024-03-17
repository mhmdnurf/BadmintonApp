import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface ConfirmButton {
  onPress: () => void;
  title: string;
}

const ConfirmButton = ({onPress, title}: ConfirmButton) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <Pressable onPress={onPress}>
            <Text style={styles.btnText}>{title}</Text>
          </Pressable>
        </View>
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
