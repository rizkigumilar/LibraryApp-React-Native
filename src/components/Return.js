import React, { Component } from 'react';
import { Modal, Text, ScrollView, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Alert } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { getBorrow, updateBorrow } from '../publics/redux/actions/borrow';
import Penalty from './Penalty';

class Restore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            borrow: [],
            update: []
        };
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentDidMount = async () => {
        const bookid = this.props.id
        await this.props.dispatch(getBorrow(bookid));
        this.setState({
            borrow: this.props.borrow
        });
    };

    changeHandle = (e) => {
        const name = e.currentTarget.name;
        let val = e.currentTarget.value;
        this.state.borrow.borrowList[name] = val;
        this.setState({ borrow: this.state.borrow })
    };

    render() {
        const editBorrow = () => {
            this.state.update.push({
                tanggal_kembali: new Date()
            })

            update()
            this.setState((prevState) => ({
                modal: !prevState.modal
            }));
        };
        let update = async () => {
            await this.props.dispatch(updateBorrow((this.state.update[0]), this.props.id))
        };

        const { borrow } = this.state;
        const list = borrow.borrowList;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        const date = dd + ' - ' + mm + ' - ' + yyyy;
        return (
            <View>
                <TouchableHighlight onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }} style={styles.borrow}>
                    <Text>Return</Text>
                </TouchableHighlight>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <View style={{ margin: 22 }}>
                        <Text>Title : {this.props.name}</Text>
                        <Text>{date}</Text>
                        <TouchableHighlight
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text style={{ color: 'black', fontSize: 18 }}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableOpacity onPress={editBorrow.bind(this)} style={styles.addButton}>
                            <Penalty id={this.props.id} />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        borrow: state.borrow
    };
};
export default connect(mapStateToProps)(Restore);
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
        bottom: 35,
        backgroundColor: 'red',
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