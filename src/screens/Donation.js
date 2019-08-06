import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postBook } from '../publics/redux/actions/book';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

class Donation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: [],
            loading: false,
        };

    }
    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed " + viewId);
    }
    chooseFile = () => {
        var options = {
            title: 'Choose Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('Cancel');
                alert('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                alert('ImagePicker Error: ' + response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                this.setState({
                    filePath: source,
                });
            }
        });
    };



    render() {
        const bookAdd = () => (
            dataFile = new FormData(),
            dataFile.append('image',
                {
                    uri: this.state.filePath.uri,
                    type: 'image/jpg',
                    name: '/'
                }
            ),
            dataFile.append('name', this.state.name),
            dataFile.append('writer', this.state.writer),
            dataFile.append('location', this.state.location),
            dataFile.append('description', this.state.description),
            dataFile.append('idCat', this.state.idCat),
            add(dataFile),
            this.props.navigation.navigate("home")
        )
        let add = async (data) => {
            await this.setState({
                loading: true
            })

            this.props.dispatch(postBook(data))
                .then(() => {
                    Alert.alert(
                        'Success',
                        'Donation Success, Thank you',
                        [
                            { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
                        ],
                    )
                    this.setState({

                        name: '',
                        writer: '',
                        image: '',
                        description: '',
                        idCat: '',
                        location: '',
                    })
                })
                .catch(() => {
                    Alert.alert(
                        'Failed',
                        'Donation Failed',
                        [
                            { text: 'Try Again' },
                        ],
                    )
                    this.setState({

                        name: '',
                        writer: '',
                        image: '',
                        description: '',
                        idCat: '',
                        location: '',
                    })
                })

        };

        return (
            <KeyboardAvoidingView>
                <ScrollView>
                    <View>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', alignItems: 'center', marginLeft: 20 }}>Welcome Generous People</Text>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Book Name"
                                onChangeText={val => this.setState({ 'name': val })} />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Writer"
                                onChangeText={val => this.setState({ 'writer': val })} />
                        </View>
                        { /* <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Image"
                            onChangeText={val => this.setState({ 'image': val })} />
                     </View> */}
                        <TouchableOpacity
                            style={styles.inputBox}
                            onPress={this.chooseFile.bind(this)}>
                            <Text style={{ color: 'black', height: 50, marginTop: 10, marginBottom: -20 }}>Choose Photo </Text>
                        </TouchableOpacity>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Category"
                                onChangeText={val => this.setState({ 'idCat': val })} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Location"
                                onChangeText={val => this.setState({ 'location': val })} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Description"
                                multiline={true}
                                onChangeText={val => this.setState({ 'description': val })} />
                        </View>
                        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={bookAdd.bind(this)}>
                            <Text style={styles.loginText}>Donate</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
const mapStateToProps = state => {
    return {
        book: state.book
    };
};
export default connect(mapStateToProps)(Donation);

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
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
    inputBox: {
        width: 200,
        marginLeft: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'black',
        marginVertical: 10,
        backgroundColor: "whitesmoke",
        borderRadius: 8,
        borderColor: 'black'
    },
    loginButton: {
        backgroundColor: "#00b5ec",
        marginLeft: 70
    },
    loginText: {
        color: 'white',
    }
});