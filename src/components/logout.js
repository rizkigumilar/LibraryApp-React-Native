import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, AsyncStorage } from 'react-native'

class Logout extends Component {
    constructor(props) {
        super(props);
        AsyncStorage.removeItem('jwToken')
        AsyncStorage.removeItem('userid')
        AsyncStorage.removeItem('name')
        AsyncStorage.removeItem('status')
    }
    render() {

        return (
            <View>
                <TouchableOpacity onPress={del.bind(this)} style={[styles.buttonContainer, styles.loginButton]}>
                    <Text style={styles.loginText}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        book: state.book
    };
};
export default connect(mapStateToProps)(Logout);

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
})