import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VerificationScreen from '../scenes/auth';
import OtpScreen from '../scenes/auth/OtpScreen';
import AppNavigator from './app-navigator';
import IncomingOrderScreen from '../scenes/home/IncomingRequestScreen';
import BgTracking from '../services/BgTracking';

const AppStack = createStackNavigator();
function AppStackNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen options={{ headerShown: false }} name="AppNavigator" component={AppNavigator} />
      <AppStack.Screen options={{ headerShown: false }} name="IncomingOrderX" component={IncomingOrderScreen} />
    </AppStack.Navigator>

  );
}
export default AppStackNavigator;