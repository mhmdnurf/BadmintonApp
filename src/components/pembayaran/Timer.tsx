import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Timer {
  timeLeft: number;
}

const Timer = ({timeLeft}: Timer) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Expired in :</Text>
        <Text style={styles.timer}>
          {Math.floor(timeLeft / 60000)}:
          {Math.floor((timeLeft / 1000) % 60)
            .toString()
            .padStart(2, '0')}
        </Text>
      </View>
    </>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins Bold',
  },
  timer: {
    fontSize: 32,
    fontFamily: 'Poppins SemiBold',
    color: '#FF8080',
  },
});
