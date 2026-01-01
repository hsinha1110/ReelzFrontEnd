import React, { FC, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Animated } from 'react-native';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import Lottie from 'lottie-react-native';
import Animation from '../../assets/animations/login.json';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constants/Colors';
import CustomText from '../../components/global/CustomText';
import { FONTS } from '../../constants/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleIcon from '../../assets/icons/google.png';
import styles from '../../styles/Login.styles';
import SocialButtonHorizontal from '../../components/global/SocialButtonHorizontal';

const LoginScreen: FC = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <CustomSafeAreaView style={styles.container}>
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
          opacity,
          transform: [{ translateY }],
        }}
      >
        <View style={styles.lottieContainer}>
          <Lottie source={Animation} autoPlay loop style={styles.lottie} />
        </View>

        <CustomText
          variant="h6"
          fontFamily={FONTS.Medium}
          style={styles.tagline}
        >
          Rewarding Every Moment for Creators and Viewers.
        </CustomText>

        <SocialButtonHorizontal
          icon={<Icon name="logo-facebook" size={20} color={Colors.text} />}
          onPress={() => {}}
          text="Continue with Facebook"
          textColor="#fff"
          backgroundColor={Colors.fbColor}
        />

        <SocialButtonHorizontal
          icon={<Image source={GoogleIcon} style={styles.gimg} />}
          onPress={() => {}}
          text="Continue with Google"
          textColor="#000"
          backgroundColor={Colors.white}
        />

        <TouchableOpacity style={styles.footerText}>
          <CustomText variant="h8" fontFamily={FONTS.Medium}>
            Reelz
          </CustomText>
        </TouchableOpacity>
      </Animated.View>
    </CustomSafeAreaView>
  );
};
export default LoginScreen;
