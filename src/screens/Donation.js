import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postBook } from '../publics/redux/actions/book';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class Donation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: [],
        };

    }
    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed " + viewId);
    }


    render() {
        const bookAdd = () => {

            this.state.book.push({
                name: this.state.name,
                writer: this.state.writer,
                description: this.state.description,
                idCat: this.state.idCat,
                location: this.state.location,
                image: this.state.image,

            });
            add()
            this.setState((prevState) => ({
                modal: !prevState.modal
            }));
        };
        let add = async () => {
            await this.props.dispatch(postBook(this.state.book[0]))

        };

        return (
            <ScrollView>
                <View>
                    <Text style={{ fontSize: 40, fontWeight: 'bold', alignItems: 'center', marginLeft: 60 }}>Donation Book</Text>
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
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Image"
                            onChangeText={val => this.setState({ 'image': val })} />
                    </View>
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
                        <Text style={styles.loginText}>Add</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
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
    loginButton: {
        backgroundColor: "#00b5ec",
        marginLeft: 70
    },
    loginText: {
        color: 'white',
    }
});