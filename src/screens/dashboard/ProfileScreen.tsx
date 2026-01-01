import { View, Text } from 'react-native';
import React, { FC } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';

const ProfileScreen: FC = () => {
  return (
    <CustomSafeAreaView>
      <Text>ProfileScreen</Text>
    </CustomSafeAreaView>
  );
};

export default ProfileScreen;
