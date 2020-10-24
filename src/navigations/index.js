//import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../scenes/splash';
import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';
import FlashMessage from "react-native-flash-message";
import AppStackNavigator from './app-stack';

const Stack = createStackNavigator();

export default function MyStack() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="Splash" component={SplashScreen} />
                <Stack.Screen options={{headerShown: false}} name="Auth" component={AuthNavigator} />
                <Stack.Screen options={{headerShown: false}} name="App" component={AppNavigator} />
                <Stack.Screen options={{headerShown: false}} name="AppStack" component={AppStackNavigator} />
            </Stack.Navigator>
            <FlashMessage position="top"  /> 
        </NavigationContainer>
    );
}