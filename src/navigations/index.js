//import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../scenes/splash';
import AuthNavigator from './auth-navigator';

const Stack = createStackNavigator();

export default function MyStack() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="Splash" component={SplashScreen} />
                <Stack.Screen options={{headerShown: false}} name="Auth" component={AuthNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}