import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Text, ScrollView, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Alert } from 'react-native';
import { Button } from 'native-base';
import { postBorrow } from '../publics/redux/actions/borrow';

class Borrow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 6666,
            id: this.props.id,
            modalVisible: false,
            borrow: [],
        };
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    render() {
        const borrow = () => {
            this.state.borrow.push({
                bookid: this.state.id,
                user_id: this.state.user_id,
            });
            add()
            this.setState((visible) => ({
                modalVisible: visible
            }));
        };
        let add = async () => {
            await this.props.dispatch(postBorrow(this.state.borrow[0]));
        };

        var today = new Date();
        var dd = String(today.getDate() + 3).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        const date = dd + ' - ' + mm + ' - ' + yyyy;
        return (
            <View>
                <TouchableHighlight onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }} style={styles.borrow}>
                    <Text>Borrow</Text>
                </TouchableHighlight>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <View style={{ margin: 22 }}>
                        <Text>Name : Samsul</Text>
                        <Text>{this.state.user_id}</Text>
                        <Text>Title : {this.props.name}</Text>
                        <Text>{date}</Text>
                        <TouchableHighlight
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text style={{ color: 'black', fontSize: 18 }}>Hide Modal</Text>
                        </TouchableHighlight>
                        <TouchableOpacity onPress={borrow.bind(this)} style={styles.addButton}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Donate</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        borrow: state.borrow
    };
};
export default connect(mapStateToProps)(Borrow);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
        padding: 20
    },
    textLeft: {
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 10
    },
    image: {
        width: 90,
        height: 140,
        borderRadius: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    writer: {
        fontSize: 18,
        paddingBottom: 10
    },
    status: {
        backgroundColor: '#428bff',
        width: 140,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    borrow: {
        position: 'absolute',
        width: 100,
        height: 57,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        right: 275,
        bottom: 50,
        backgroundColor: '#05A0E4',
        borderRadius: 10,
        elevation: 3
    },
    des: {
        marginTop: 0,
        padding: 20,
    },
    addButton: {
        backgroundColor: 'black',
        marginTop: 40,
        width: 160,
        height: 40,
        borderRadius: 8,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center"
    },
})