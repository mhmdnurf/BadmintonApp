import React from 'react';
import {FlatList, Pressable} from 'react-native';
import MemberCard from './MemberCard';
import BottomSpace from '../BottomSpace';

interface ListMember {
  id: string;
  namaGOR: string;
}

interface MemberData {
  data: ListMember[];
  onPress: () => void;
}

const ListMember = ({data, onPress}: MemberData) => {
  return (
    <>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Pressable onPress={onPress}>
            <MemberCard namaGOR={item.namaGOR} />
          </Pressable>
        )}
        keyExtractor={item => item.id}
        ListFooterComponent={<BottomSpace marginBottom={100} />}
      />
    </>
  );
};

export default ListMember;
