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
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6F7789',
  },
});
