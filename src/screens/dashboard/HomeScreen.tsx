import { View, Text } from 'react-native';
import React, { FC } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';

const HomeScreen: FC = () => {
  return (
    <CustomSafeAreaView>
      <Text>HomeScreen</Text>
    </CustomSafeAreaView>
  );
};

export default HomeScreen;
