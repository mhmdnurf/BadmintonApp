import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const JadwalItem = ({title}: {title: string}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </>
  );
};

export default JadwalItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#AAC8A7',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    marginHorizontal: 2,
  },
  title: {fontSize: 18, color: 'white', fontWeight: '600'},
});
