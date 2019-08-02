import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    Button
} from 'react-navigation';

import HomeScreen from '../../screens/Home';
import BookDetail from '../../screens/BookDetail';

import AddScreen from '../../screens/Donation';
import HistoryScreen from '../../screens/History';
import ProfileScreen from '../../screens/Profile';
import Login from '../../screens/LoginForm'
import Register from '../../screens/Register'


const HomeStack = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        BookDetail: { screen: BookDetail },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#05A0E4',
            },
            headerTintColor: 'white',
            headerTitle: 'LIBRARY',
        },
    }
);

const DonationStack = createStackNavigator(
    {
        Donation: { screen: AddScreen },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#05A0E4',
            },
            headerTintColor: 'white',
            title: 'DONATION',
        },
    }
);

const HistoryStack = createStackNavigator(
    {
        History: { screen: HistoryScreen },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#05A0E4',
            },
            headerTintColor: 'white',
            title: 'HISTORY',
        },
    }
);

const ProfileStack = createStackNavigator(
    {
        Profile: { screen: ProfileScreen },
        Login: { screen: Login },
        Register: { screen: Register },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#05A0E4',
            },
            headerTintColor: 'white',
            title: 'PROFILE',
        },
    }
);


const switchNavigator = createBottomTabNavigator(
    {
        Home: { screen: HomeStack },
        Donation: { screen: DonationStack },
        // History: { screen: HistoryStack },
        Profile: { screen: ProfileStack },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-home`;
                } else if (routeName === 'Donation') {
                    iconName = `ios-add-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'History') {
                    iconName = `md-bookmarks`;
                } else if (routeName === 'Profile') {
                    iconName = `ios-contact`;
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#05A0E4',
            inactiveTintColor: 'gray',
        },
    }
);

export default createAppContainer(switchNavigator);