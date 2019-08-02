import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { login, getUserId } from '../publics/redux/actions/user';
import {
    AsyncStorage,
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
import { NavigationEvents } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            user: [],
            email: '',
            name: '',
            password: ''

        }
        AsyncStorage.getItem('name', (error, result) => {
            if (result) {
                this.setState({
                    name: result,
                });
            }
        });

    }
    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed " + viewId);
    }
    render() {
        console.log('ini nama', this.state.name)
        const log = () => {
            this.state.user.push({
                email: this.state.email.toLocaleLowerCase(),
                password: this.state.password.toLocaleLowerCase(),
            });
            loginuser()
            this.setState({ isLogin: true });
        };
        let loginuser = async () => {
            await this.props.dispatch(login(this.state.user[0]))
                .then(() => {
                    this.props.navigation.navigate('Home');
                })

        };
        const del = () => {
            AsyncStorage.removeItem('userid')
            AsyncStorage.removeItem('jwtToken')
                .then(() => {
                    this.setState({ isLogin: false })
                    this.props.navigation.navigate("Home");
                })
        };
        console.log("userid", this.state.isLogin)
        return (
            <ScrollView>
                <View behavior="padding"
                    style={styles.Wrapper}>
                    <NavigationEvents
                        onWillFocus={payload => this.props.dispatch(getUserId(this.state.userid))}
                    />

                    <View style={styles.container}>
                        <Image style={styles.logo} source={Logo} />
                        {this.state.isLogin == false ? (
                            <View>
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
                            </View>) : (<View>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Hello, {this.state.name}</Text>
                                <TouchableHighlight onPress={del.bind(this)} style={[styles.buttonContainer, styles.loginButton]}>
                                    <Text style={styles.loginText}>Logout</Text>
                                </TouchableHighlight>
                            </View>)}
                    </View>
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