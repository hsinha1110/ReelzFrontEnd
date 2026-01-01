import {
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
  SplashScreen,
} from '../screens';
import BottomTab from './BottomTab';

export const authStack = [
  {
    name: 'LoginScreen',
    component: LoginScreen,
  },
  {
    name: 'RegisterScreen',
    component: RegisterScreen,
  },
  {
    name: 'SplashScreen',
    component: SplashScreen,
  },
];

export const dashboardStack = [
  {
    name: 'BottomTab',
    component: BottomTab,
  },
  {
    name: 'ProfileScreen',
    component: ProfileScreen,
  },
];

export const mergedStacks = [...dashboardStack, ...authStack];
