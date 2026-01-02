import React, { FC, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '../../constants/Colors';
import Logo from '../../assets/images/logo_t.png';
import CustomText from '../../components/global/CustomText';
import { FONTS } from '../../constants/Fonts';
import { resetAndNavigate } from '../../utils/NavigationUtil';

const SplashScreen: FC = () => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    );

    breathingAnimation.start();
    const timer = setTimeout(() => {
      resetAndNavigate('LoginScreen');
    }, 2000);

    return () => {
      breathingAnimation.stop();
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={Logo}
          style={[styles.logo, { transform: [{ scale }] }]}
        />
        <CustomText variant="h3" fontFamily={FONTS.Reelz}>
          Reelz
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '40%',
    height: '25%',
    resizeMode: 'contain',
  },
});

export default SplashScreen;
