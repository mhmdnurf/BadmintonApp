import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import MemberField from '../components/member/MemberField';
import MemberCard from '../components/member/MemberCard';

const Member = () => {
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Member" />
        <MemberField />
        <MemberCard />
      </RootContainer>
    </>
  );
};

export default Member;
