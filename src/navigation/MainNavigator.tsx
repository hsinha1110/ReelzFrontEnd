import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { mergedStacks } from './ScreenCollections';
import { SheetProvider } from 'react-native-actions-sheet';

const Stack = createNativeStackNavigator();
const MainNavigator: FC = () => {
  return (
    <SheetProvider>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        {mergedStacks.map((item, index) => {
          return (
            <Stack.Screen
              key={index}
              name={item.name}
              component={item.component}
            />
          );
        })}
      </Stack.Navigator>
    </SheetProvider>
  );
};

export default MainNavigator;
