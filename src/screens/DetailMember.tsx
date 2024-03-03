import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import DetailField from '../components/detail_member/DetailField';

const DetailMember = () => {
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Detail Member" />
        <DetailField />
      </RootContainer>
    </>
  );
};

export default DetailMember;
