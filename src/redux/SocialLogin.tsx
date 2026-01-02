import { Alert } from 'react-native';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import { AppDispatch } from '../redux/store';
import { setUser } from '../redux/slice/user.slice';
import { token_storage } from './storage';
import { SERVICE_ROUTES } from './constants';
import { SocialUser, LoginResponse, FacebookGraphResult } from './types';

/* -------------------- GOOGLE LOGIN ------------------ */
export const signInWithGoogle =
  () =>
  async (dispatch: AppDispatch): Promise<SocialUser | null> => {
    try {
      await GoogleSignin.hasPlayServices();

      // signIn returns the user directly
      const userInfo = await GoogleSignin.signIn();

      // Get ID token for backend
      const { idToken } = await GoogleSignin.getTokens();
      if (!userInfo || !idToken) return null;

      // Call backend
      const res = await axios.post<LoginResponse>(SERVICE_ROUTES.LOGIN, {
        provider: 'google',
        id_token: idToken,
      });

      // Store tokens
      token_storage.set('access_token', res.data.data.tokens.access_token);
      token_storage.set('refresh_token', res.data.data.tokens.refresh_token);
      dispatch(setUser(res.data.data.user));

      // Map to SocialUser type
      const socialUser: SocialUser = {
        name: userInfo.data?.user.name ?? '',
        email: userInfo.data?.user.email ?? '',
        image: userInfo.data?.user.photo ?? '',
        provider: 'google',
      };

      console.log('Google Login Response:', socialUser, 'ID_TOKEN:', idToken);
      return socialUser;
    } catch (err) {
      console.log('Google Login Error', err);
      Alert.alert('Google login failed');
      return null;
    }
  };

/* -------------------- FACEBOOK LOGIN ---------------- */
export const signInWithFacebook =
  () =>
  async (dispatch: AppDispatch): Promise<SocialUser | null> => {
    try {
      LoginManager.logOut();

      const loginResult = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (loginResult.isCancelled) return null;

      const tokenData = await AccessToken.getCurrentAccessToken();
      if (!tokenData) return null;

      // Fetch FB profile
      const fbUserData: SocialUser = await new Promise((resolve, reject) => {
        const infoRequest = new GraphRequest(
          '/me?fields=id,name,email,picture.type(large)',
          { accessToken: tokenData.accessToken },
          (error, result) => {
            if (error || !result)
              return reject(error ?? new Error('No Facebook data'));

            const fbResult = result as FacebookGraphResult;

            resolve({
              name: fbResult.name ?? '',
              email: fbResult.email ?? '',
              image: fbResult.picture?.data?.url ?? '',
              provider: 'facebook',
            });
          },
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      });

      // Backend login
      const res = await axios.post<LoginResponse>(SERVICE_ROUTES.LOGIN, {
        provider: 'facebook',
        id_token: tokenData.accessToken,
      });

      token_storage.set('access_token', res.data.data.tokens.access_token);
      token_storage.set('refresh_token', res.data.data.tokens.refresh_token);
      dispatch(setUser(res.data.data.user));

      console.log('Facebook Login Response:', fbUserData);
      return fbUserData;
    } catch (err) {
      console.log('Facebook Login Error', err);
      Alert.alert('Facebook login failed');
      return null;
    }
  };
