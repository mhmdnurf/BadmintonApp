import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Header {
  title: string;
}

const Header = ({title}: Header) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 50,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    color: '#6F7789',
  },
});
