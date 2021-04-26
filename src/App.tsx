// npm install intl
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React, { useEffect } from 'react';
// https://reactnavigation.org/docs/getting-started
// npm install @react-navigation/native
// npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
// https://reactnavigation.org/docs/hello-react-navigation
// npm install @react-navigation/stack
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

// over-the-air update:
import * as Updates from 'expo-updates';

export default function App() {
  // over-the-air update: When the user opens the app, useEffect will check
  // for updates. If available, it will update the app (Ex: COD Mobile).
  // COMMENT NEXT USEEFFECT ON DEV MODE:
  // useEffect(() => {
  //   async function updateApp() {
  //     const { isAvailable } = await Updates.checkForUpdateAsync();
  //     if (isAvailable) {
  //       await Updates.fetchUpdateAsync();
  //       await Updates.reloadAsync();
  //     }
  //   }
  //   updateApp();
  // }, []);

  return <Routes />;
}
