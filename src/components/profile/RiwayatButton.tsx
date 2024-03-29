import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface RiwayatButton {
  onPress: () => void;
}

const RiwayatButton = ({onPress}: RiwayatButton) => {
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.btnContainer} onPress={onPress}>
          <Text style={styles.btnText}>Riwayat Pemesanan</Text>
        </Pressable>
      </View>
    </>
  );
};

export default RiwayatButton;

const styles = StyleSheet.create({
  container: {marginHorizontal: 20},
  btnContainer: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 15,
    width: '100%',
    backgroundColor: '#AAC8A7',
    borderRadius: 15,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins SemiBold',
    color: 'white',
  },
});
