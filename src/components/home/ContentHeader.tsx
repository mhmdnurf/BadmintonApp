import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ContentHeader {
  title: string;
}

const ContentHeader = ({title}: ContentHeader) => {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </>
  );
};

export default ContentHeader;

const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#474F7A',
  },
});
