import React, { FC } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import CustomText from '../../components/global/CustomText';
import { FONTS } from '../../constants/Fonts';

const RegisterScreen: FC = () => {
  return (
    <CustomSafeAreaView>
      <CustomText variant="h6" fontFamily={FONTS.Medium}>
        Register Screen
      </CustomText>
    </CustomSafeAreaView>
  );
};

export default RegisterScreen;
