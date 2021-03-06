import React, { Component } from 'react';
import { Modal, Text, ScrollView, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Alert } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { getBorrow, updateBorrow } from '../publics/redux/actions/borrow';

class Penalty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            borrow: [],
            updates: [],
            denda: 0,
            hari: 0,
        };
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentDidMount = async () => {
        const bookid = this.props.match.params.idBook;
        await this.props.dispatch(getBorrow(bookid));
        this.setState({
            borrow: this.props.borrow
        });
        const { borrow } = this.state;
        const list = borrow.borrowList;


        {
            list &&
                list.length > 0 &&
                list.map((item, index) => {
                    const a = Date.parse(item.tanggal_kembali);
                    const b = Date.parse(item.harus_kembali);
                    const biaya = 1000;
                    return this.setState({
                        denda: ((a - b) / 86400000) * (biaya),
                        hari: (a - b) / 86400000
                    })
                })
        }
    };

    render() {
        const editBorrows = () => {
            this.state.updates.push({
                denda: this.state.denda
            })

            update()
            this.setState((visible) => ({
                modalVisible: visible
            }));
        };

        let update = async () => {
            await this.props.dispatch(updateBorrow((this.state.updates[0]), this.props.id))
        };
        console.log(this.state.updates[0])
        return (
            <View>
                <Button onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }} style={styles.borrow}>
                    <Text style={{ color: 'white', marginBottom: 18 }}>Confirm</Text>
                </Button>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <View style={styles.container}>
                        <Text>You're late {this.state.hari} day and fined Rp. {this.state.denda}</Text>
                        <Text>Please confirm to administrator </Text>
                        <Text>for return the book, Thank you</Text>
                        <TouchableOpacity onPress={editBorrows.bind(this)} style={styles.addButton}>
                            <Text style={{ color: 'white' }}>Oke</Text>
                        </TouchableOpacity>
                        <TouchableHighlight
                            onPress={() => { this.setModalVisible(!this.state.modalVisible) }} style={styles.addButton}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Cancel</Text>
                        </TouchableHighlight>
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
export default connect(mapStateToProps)(Penalty);
const styles = StyleSheet.create({
    container: {
        paddingTop: 200,
        marginLeft: 100
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
        backgroundColor: 'black',
        width: 140,
        height: 30,
        marginTop: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    des: {
        marginTop: 0,
        padding: 20,
    },
    addButton: {
        backgroundColor: 'black',
        marginTop: 20,
        width: 160,
        height: 40,
        borderRadius: 8,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center"
    },
})
