import React, { FC, useState } from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import Lottie from 'lottie-react-native';
import Animation from '../../assets/animations/login.json';
import { Colors } from '../../constants/Colors';
import CustomText from '../../components/global/CustomText';
import { FONTS } from '../../constants/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleIcon from '../../assets/icons/google.png';
import styles from '../../styles/Login.styles';
import SocialButtonHorizontal from '../../components/global/SocialButtonHorizontal';
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
} from '@react-native-google-signin/google-signin';

const LoginScreen: FC = () => {
  const [googleUser, setGoogleUser] = useState<any>(null);
  console.log(googleUser, '...googleUser');
  const fbLogin = async () => {
    try {
      LoginManager.logOut();

      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        Alert.alert('Facebook login cancelled');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) throw new Error('No access token');

      const profile = await Profile.getCurrentProfile();

      const userData = {
        accessToken: data.accessToken.toString(),
        userID: data.userID,
        name: profile?.name ?? '',
        imageURL: profile?.imageURL ?? '',
      };

      console.log('FB LOGIN SUCCESS', userData);
    } catch (error) {
      console.log('Facebook Login Error', error);
      Alert.alert('Facebook login failed');
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      setGoogleUser(userInfo);

      console.log('GOOGLE LOGIN SUCCESS', userInfo);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('User cancelled Google login');
            break;
          case statusCodes.IN_PROGRESS:
            console.log('Google login in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert('Google Play Services not available');
            break;
          default:
            console.log('Google Signin error', error);
        }
      } else {
        console.log('Unknown Google error', error);
      }
    }
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      <View style={styles.lottieContainer}>
        <Lottie source={Animation} autoPlay loop style={styles.lottie} />
      </View>

      <CustomText variant="h6" fontFamily={FONTS.Medium} style={styles.tagline}>
        Rewarding Every Moment for Creators and Viewers.
      </CustomText>

      <SocialButtonHorizontal
        icon={<Icon name="logo-facebook" size={20} color={Colors.text} />}
        onPress={fbLogin}
        text="Continue with Facebook"
        textColor="#fff"
        backgroundColor={Colors.fbColor}
      />

      <SocialButtonHorizontal
        icon={<Image source={GoogleIcon} style={styles.gimg} />}
        onPress={googleSignIn}
        text="Continue with Google"
        textColor="#000"
        backgroundColor={Colors.white}
      />

      <TouchableOpacity style={styles.footerText}>
        <CustomText variant="h8" fontFamily={FONTS.Medium}>
          Reelz
        </CustomText>
      </TouchableOpacity>
    </CustomSafeAreaView>
  );
};

export default LoginScreen;
