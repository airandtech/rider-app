import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../scenes/home/HomeScreen';
import SettingsScreen from '../scenes/home/SettingsScreen';
import DeliveriesScreen from '../scenes/home/DeliveriesScreen';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native';
import { color } from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

function AppNavigator() {

    const [activeColour, setActiveColour] = useState('#F72514');
    const [inactiveColour, setInactiveColour] = useState('#FFF');


    return (
        <Tab.Navigator
            initialRouteName="Deliveries"
            screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Deliveries') {
                this.setDColour('yellow')
            } else if (route.name === 'Calendar') {

            } else if (route.name === 'Support') {

            } else if (route.name === 'Setup') {
              
            } else {
              
              //return <Ionicons name={iconName} size={size} color={color} />;
            }

            // You can return any component that you like here!
            // return <Ionicons name={iconName} size={size} color={color} />;
            //  return ({menuBarIcon});
          },
        })}
            tabBarOptions={{
                activeTintColor: '#F72514',
                inactiveTintColor: '#FFF',
                style: {
                    backgroundColor: '#07223D',
                    paddingVertical: 10,
                    minHeight: 60
                },
                labelStyle:{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 14
                }
            }}
        >
            <Tab.Screen name="Deliveries" component={DeliveriesScreen}
                options={{
                    tabBarLabel: 'Deliveries',
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={require('../assets/images/deliveries_icon.png')}
                            style={{ height: 25, width: 25, tintColor: focused ? activeColour : inactiveColour }}
                        />

                    ),
                }}
            />
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={require('../assets/images/home_icon.png')}
                            style={{ height: 25, width: 25, tintColor: focused ? activeColour : inactiveColour}}
                        />
                    ),
                    // tabBarBadge: 3,
                }}
            />

            <Tab.Screen name="Settings" component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={require('../assets/images/settings_icon.png')}
                            style={{ height: 25, width: 25, tintColor: focused ? activeColour : inactiveColour }}
                        />
                    ),
                    // tabBarBadge: 3,
                }}
            />
        </Tab.Navigator>
    );
}
export default AppNavigator;