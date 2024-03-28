import React from 'react';
import {FlatList, Pressable, RefreshControl} from 'react-native';
import MemberCard from './MemberCard';
import BottomSpace from '../BottomSpace';

interface ListMember {
  user_uid: string;
  namaGOR: string;
}

interface MemberData {
  data: ListMember[];
  onPress: (id: string) => () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const ListMember = ({data, onPress, refreshing, onRefresh}: MemberData) => {
  return (
    <>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <Pressable onPress={onPress(item.user_uid)}>
            <MemberCard namaGOR={item.namaGOR} />
          </Pressable>
        )}
        keyExtractor={item => item.user_uid}
        ListFooterComponent={<BottomSpace marginBottom={100} />}
      />
    </>
  );
};

export default ListMember;
