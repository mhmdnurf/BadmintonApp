import React from 'react';
import Header from '../components/Header';
import MemberField from '../components/member/MemberField';
import ListMember from '../components/member/ListMember';
import FlatContainer from '../components/FlatContainer';

interface Member {
  navigation: any;
}

const Member = ({navigation}: Member) => {
  const data = [
    {
      id: '1',
      namaGOR: 'GOR Chans',
    },
    {
      id: '2',
      namaGOR: 'GOR Mahakam',
    },
    {
      id: '3',
      namaGOR: 'GOR Abhimata',
    },
  ];

  const handleNavigateDetailMember = () => {
    navigation.navigate('DetailMember');
  };
  return (
    <>
      <FlatContainer backgroundColor="white">
        <Header title="Member" />
        <MemberField />
        <ListMember data={data} onPress={handleNavigateDetailMember} />
      </FlatContainer>
    </>
  );
};

export default Member;
