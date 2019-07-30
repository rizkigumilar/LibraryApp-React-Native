import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';


class BookDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.navigation.state.params.idBook,
            image: this.props.navigation.state.params.image,
            name: this.props.navigation.state.params.name,
            writer: this.props.navigation.state.params.writer,
            description: this.props.navigation.state.params.description
        }
    }
    render() {
        return (
            <View style={styles.MainContainer}>
                <Image style={styles.imageThumbnail} source={{ uri: this.props.image }} />
                <Text>{this.state.name}</Text>
                <Text>{this.state.writer}</Text>
                <Text>{this.state.description}</Text>
            </View>
        );
    }
}

export default BookDetail

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 0,
    },

    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderRadius: 10
    },

    title: {
        fontSize: 18,
        marginBottom: 20,
        marginTop: -30,
        marginLeft: 20,
        fontWeight: 'bold'
    }
});
