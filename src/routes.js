import React from 'react';
// React Native Navigation: Look file index.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Incidents from './pages/incidents';
import Detail from './pages/detail';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      {/* DON'T SHOW NATIVE HEADER: headerShown: false */}
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
