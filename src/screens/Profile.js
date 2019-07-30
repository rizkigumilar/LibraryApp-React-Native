import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
class Profile extends Component {


    render() {
        return (
            <View>
                <View style={{ marginTop: 100 }}>
                    <Button title="Login" style={{ backgroundColor: '#05A0E4', marginTop: 40 }} onPress={() => this.props.navigation.navigate('Login')} />
                </View>
                <Text>Profile</Text>
                <Button title="Register" style={{ backgroundColor: '#05A0E4', marginTop: 40 }} onPress={() => this.props.navigation.navigate('Register')} />
            </View>
        );
    }
}

export default Profile
