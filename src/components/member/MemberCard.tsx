import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface MemberCard {
  namaGOR: string;
}

const MemberCard = ({namaGOR}: MemberCard) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.icon}>
            <Icon name="badminton" size={30} color="#AAC8A7" />
          </View>
          <Text style={styles.title}>{namaGOR}</Text>
        </View>
      </View>
    </>
  );
};

export default MemberCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    borderWidth: 3,
    borderColor: '#F3F3F3',
    elevation: 3,
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    top: -20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
    color: '#4A4A4A',
  },
});
