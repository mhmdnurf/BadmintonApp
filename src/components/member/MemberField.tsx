import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Logo from '../../assets/svg/member.svg';

const MemberField = () => {
  return (
    <>
      <View style={styles.svgContainer}>
        <Logo width={300} height={200} />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Status Member</Text>
      </View>
    </>
  );
};

export default MemberField;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  svgContainer: {
    alignSelf: 'center',
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
  },
});
