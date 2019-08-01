import React, { Component } from 'react';
import {
    Modal,
    StyleSheet,
    View,
    Image,
    Text,
    Button
} from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Borrow from '../components/Borrow';



class BookDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.navigation.state.params.idBook,
            image: this.props.navigation.state.params.image,
            name: this.props.navigation.state.params.name,
            writer: this.props.navigation.state.params.writer,
            description: this.props.navigation.state.params.description,
            status: this.props.navigation.state.params.StatusBorrow,
            modalVisible: false,
            user: null,
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.MainContainer}>
                    <Image style={styles.imageCover} source={{ uri: this.state.image }} />
                    <Image style={styles.imageThumbnail} source={{ uri: this.state.image }} />
                    <Text style={styles.title}>{this.state.name}</Text>
                    <Text style={styles.writer}>by : {this.state.writer}</Text>
                    <Borrow />
                    <Text>{this.state.description}</Text>
                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
        borrow: state.borrow,
    };
};

export default connect(mapStateToProps)(BookDetail);

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 0,
    },

    imageCover: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
        width: 400,
        marginRight: 10,
        marginBottom: 30
    },

    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: 100,
        marginLeft: 250,
        marginTop: -100,
        marginRight: 10,
        marginBottom: 30,
        borderRadius: 10
    },

    title: {
        fontSize: 18,
        marginBottom: 20,
        marginTop: -70,
        marginLeft: 20,
        fontWeight: 'bold'
    },

    status: {
        backgroundColor: '#428bff',
        width: 140,
        height: 30,
        marginTop: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    writer: {
        marginBottom: 20,
        marginTop: -28,
        marginLeft: 20,
    }
});
