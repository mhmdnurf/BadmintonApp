import React from 'react';
import {Dimensions, FlatList, Pressable, StyleSheet} from 'react-native';
import LapanganCard from '../home/LapanganCard';

interface GorData {
  id: string;
  namaGOR: string;
  jumlahLapangan: number;
  imageSource: any;
}

interface DaftarGor {
  data: GorData[];
  onPress: (id: string) => () => void;
}

const DaftarGor = ({data, onPress}: DaftarGor) => {
  return (
    <>
      <FlatList
        style={styles.flatlist}
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Pressable onPress={onPress(item.id)}>
            <LapanganCard
              imageSource={item.imageSource}
              width={Dimensions.get('window').width - 40}
              marginLeft={0}
              namaGOR={item.namaGOR}
              jumlahLapangan={item.jumlahLapangan}
            />
          </Pressable>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default DaftarGor;

const styles = StyleSheet.create({
  flatlist: {
    alignSelf: 'center',
  },
});
