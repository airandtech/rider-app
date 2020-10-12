import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../scenes/home/HomeScreen';
import SettingsScreen from '../scenes/home/SettingsScreen';
import DeliveriesScreen from '../scenes/home/DeliveriesScreen';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native';
import { color } from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

function AppNavigator() {


    return (
        <Tab.Navigator
            initialRouteName="Deliveries"
            tabBarOptions={{
                activeTintColor: '#F72514',
                inactiveTintColor: '#FFF',
                style: {
                    backgroundColor: '#07223D',
                    paddingTop: 10
                },
                labelStyle:{
                    fontWeight: 'bold',
                    fontSize: 14
                }
            }}
        >
            <Tab.Screen name="Deliveries" component={DeliveriesScreen}
                options={{
                    tabBarLabel: 'Deliveries',
                    tabBarIcon: () => (
                        <Image
                            source={require('../assets/images/deliveries_icon.png')}
                            style={{ height: 25, width: 25, tintColor: '#F72514' }}
                        />

                    ),
                }}
            />
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <Image
                            source={require('../assets/images/home_icon.png')}
                            style={{ height: 25, width: 25, tintColor: '#FFF'}}
                        />
                    ),
                    // tabBarBadge: 3,
                }}
            />

            <Tab.Screen name="Settings" component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: () => (
                        <Image
                            source={require('../assets/images/settings_icon.png')}
                            style={{ height: 25, width: 25, tintColor: '#FFF'}}
                        />
                    ),
                    // tabBarBadge: 3,
                }}
            />
        </Tab.Navigator>
    );
}
export default AppNavigator;