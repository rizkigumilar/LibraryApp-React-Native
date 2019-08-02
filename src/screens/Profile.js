import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './LoginForm'
class Profile extends Component {


    render() {
        return (
            <View>
                <View>
                    <Login />
                </View>
            </View>
        );
    }
}

export default Profile;