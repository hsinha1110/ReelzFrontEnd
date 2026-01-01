import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import BootSplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    const hideSplash = async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash hidden');
    };

    hideSplash();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>App</Text>
    </View>
  );
};

export default App;
