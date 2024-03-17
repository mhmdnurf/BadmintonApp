import React from 'react';
import {Dimensions, FlatList, Pressable, StyleSheet} from 'react-native';
import GORCard from '../home/GorCard';

interface GorData {
  id: string;
  namaGOR: string;
  alamat: string;
  fotoGOR: string;
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
            <GORCard
              uri={item.fotoGOR}
              width={Dimensions.get('window').width - 40}
              marginLeft={0}
              namaGOR={item.namaGOR}
              alamatGOR={item.alamat}
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
