import React from 'react';
import {Dimensions, FlatList, Pressable, StyleSheet} from 'react-native';
import GORCard from '../home/GorCard';

interface GorData {
  id: string;
  namaGOR: string;
  alamatGOR: string;
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
            <GORCard
              imageSource={item.imageSource}
              width={Dimensions.get('window').width - 40}
              marginLeft={0}
              namaGOR={item.namaGOR}
              alamatGOR={item.alamatGOR}
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
