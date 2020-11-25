import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VerificationScreen from '../scenes/auth';
import OtpScreen from '../scenes/auth/OtpScreen';
import AppNavigator from './app-navigator';
import BgTracking from '../services/BgTracking';

const AuthStack = createStackNavigator();
function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen options={{ headerShown: false }} name="Verification" component={VerificationScreen} />
      <AuthStack.Screen options={{ headerShown: false }} name="OTP" component={OtpScreen} />
      <AuthStack.Screen options={{ headerShown: false }} name="BgTracking" component={BgTracking} />
      <AuthStack.Screen options={{ headerShown: false }} name="AppHome" component={AppNavigator} />
      <AuthStack.Screen
        options={{
          title: 'DASHBOARD',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#07223D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="App" component={AppNavigator} />
    </AuthStack.Navigator>

  );
}
export default AuthNavigator;