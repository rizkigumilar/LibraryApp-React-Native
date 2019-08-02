import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../publics/redux/actions/user';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import profile from '../assets/profile.png'

class Register extends Component {

    constructor(props) {
        super(props);
        state = {
            user: [],
        }
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed " + viewId);
    }

    render() {
        const userRegister = () => {
            this.state.user.push({
                email: this.state.email,
                fullname: this.state.fullname,
                password: this.state.password,
                idNum: this.state.idNum,
            });

            add()
            this.setState((prevState) => ({
                modal: !prevState.modal
            }));
            console.log(this.state.user);
        };
        let add = async () => {
            await this.props.dispatch(register(this.state.user[0]))
        };

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'http://icons.iconarchive.com/icons/mysitemyway/blue-jeans-social-media/256/mail-icon.png' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })} />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={profile} />
                    <TextInput style={styles.inputs}
                        placeholder="Fullname"
                        keyboardType="default"
                        underlineColorAndroid='transparent'
                        onChangeText={(fullname) => this.setState({ fullname })} />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={profile} />
                    <TextInput style={styles.inputs}
                        placeholder="Id Number"
                        keyboardType="numeric"
                        underlineColorAndroid='transparent'
                        onChangeText={(idNum) => this.setState({ idNum })} />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://image.flaticon.com/icons/png/512/69/69891.png' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={userRegister.bind(this)}>
                    <Text style={styles.loginText}>Register</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>Login</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    };
};
export default connect(mapStateToProps)(Register);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 40,
        marginBottom: 30
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
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