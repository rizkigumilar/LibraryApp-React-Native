import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, Modal, Text, ScrollView, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Alert } from 'react-native';
import { postBorrow } from '../publics/redux/actions/borrow';

class Borrow extends Component {
    state = {
        name: '',
        user_id: '',
        idNum: '',
        id: this.props.id,
        modalVisible: false,
        borrow: [],
    };
    constructor(props) {
        super(props);

    }
    componentDidMount = async () => {
        await AsyncStorage.getItem('userid').then((value) => {
            this.setState({ userid: value })
        })
        await AsyncStorage.getItem('name').then((value) => {
            this.setState({ name: value })
        })
        await AsyncStorage.getItem('idNum', (err, result) => {
            console.log("idNum", err + result)
            if (result) {
                this.setState({ idNum: result })
            }
        })

    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    render() {
        console.log("ini id nyaaa", this.state.idNum)
        const borrow = () => {
            this.state.borrow.push({
                idNum: this.state.idNum,
                idBook: this.state.id
            });
            add()
            this.setState((visible) => ({
                modalVisible: visible
            }));
        };
        let add = async () => {
            await this.props.dispatch(postBorrow(this.state.borrow[0]));
        };
        console.log(this.state.idBook)
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
                    <View style={styles.container}>
                        <Text>Name : {this.state.name}</Text>
                        <Text>{this.state.idNum}</Text>
                        <Text>Title : {this.props.name}</Text>
                        <Text>{date}</Text>
                        <TouchableOpacity onPress={borrow.bind(this)} style={styles.addButton}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Borrow</Text>
                        </TouchableOpacity>
                        <TouchableHighlight
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }} style={styles.addButton}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Cancel</Text>
                        </TouchableHighlight>
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
        paddingTop: 200,
        marginLeft: 100
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
        top: -90,
        backgroundColor: '#05A0E4',
        borderRadius: 10,
        elevation: 3
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