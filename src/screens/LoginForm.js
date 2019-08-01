import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { login } from '../publics/redux/actions/user';
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
import Logo from '../assets/librarysymbol.jpg'
import { ScrollView } from 'react-native-gesture-handler';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            email: '',
            password: ''
        };
    }
    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed " + viewId);
    }

    render() {
        const log = () => {
            this.state.user.push({
                email: this.state.email.toLocaleLowerCase(),
                password: this.state.password.toLocaleLowerCase(),
            });
            loginuser()

            console.log(this.state.user);
        };
        let loginuser = async () => {
            await this.props.dispatch(login(this.state.user[1]))
                .then(() => {
                    this.props.navigation.navigate('Home');
                    console.log('berhasil')
                    console.log(AsyncStorage.getItem('jwtToken'))
                    console.log(AsyncStorage.getItem('idUser'))
                })

        };

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.logo} source={Logo} />
                    <Text style={styles.title}>Login</Text>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'http://icons.iconarchive.com/icons/mysitemyway/blue-jeans-social-media/256/mail-icon.png' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Email"
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={(email) => this.setState({ email })} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://image.flaticon.com/icons/png/512/69/69891.png' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Password"
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(password) => this.setState({ password })} />
                    </View>

                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={log}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
                        <Text>Forgot your password?</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Register')}>
                        <Text>Register</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );

    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    };
};
export default connect(mapStateToProps)(withNavigation(Login))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    logo: {
        marginBottom: 20,
        height: 330
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 3,
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
        marginBottom: 30,
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