import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
class Profile extends Component {


    render() {
        return (
            <View>
                <View style={{ marginTop: 90, marginLeft: 70 }}>
                    <Text>Please Login or Register to Loan Book</Text>
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('Login')} ><Text>Login</Text></TouchableHighlight>
                    <Text style={{ marginLeft: 120 }}>Or</Text>
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('Register')} ><Text>Register</Text></TouchableHighlight>
                </View>
            </View>
        );
    }
}

export default Profile;

const styles = StyleSheet.create({
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});
