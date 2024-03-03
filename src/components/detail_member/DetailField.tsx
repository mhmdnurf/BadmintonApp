import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DetailField = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Status</Text>
      </View>
    </>
  );
};

export default DetailField;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
