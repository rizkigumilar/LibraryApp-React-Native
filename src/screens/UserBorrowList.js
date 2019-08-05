import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userBorrow } from '../publics/redux/actions/borrow';;
import moment from 'moment';
import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

class BorrowList extends Component {
    state = {
        borrow: [],
    };
    componentDidMount = async () => {
        const idNum = this.props.navigation.state.params.idNum
        const userid = this.props.navigation.state.params.userid
        const token = this.props.navigation.state.params.token
        await this.props.dispatch(userBorrow(idNum, userid, token));
        this.setState({
            borrow: this.props.borrow,
        });
        this.subs = [
            this.props.navigation.addListener('willFocus', async () => {
                await this.props.dispatch(userBorrow(idNum, userid, token));
                this.setState({
                    borrow: this.props.borrow,
                })
            }
            )]
    };

    componentWillUnmount = () => {
        this.subs.forEach(sub => {
            sub.remove();
        });
    };
    render() {
        return (
            <ScrollView>
                {this.props.borrow.isFulfilled == false ?
                    (
                        <View style={{ height: 500, width: '100%', flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                            <ActivityIndicator
                                color='black'
                                size="large"
                                style={styles.activityIndicator} />
                        </View>
                    ) :
                    (
                        <View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>My Borrow List!</Text>
                            </View>
                            <View >
                                <FlatList
                                    data={this.props.borrow.borrowList}
                                    numColumns={1}
                                    onEndReachedThreshold={0.2}
                                    keyExtractor={(item) => item.userid}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity activeOpacity={1}>
                                                <View style={styles.container} key={index}>
                                                    <Image style={styles.image} source={{ uri: `${item.image}` }} />
                                                    <View style={styles.textLeft}>
                                                        <Text>{item.name}</Text>
                                                        <Text>By :{item.writer}</Text>
                                                        <Text>Borrow :{moment(item.TanggalPinjam).format("DD-MM-YYYY")}</Text>
                                                        <Text>Return :{moment(item.TanggalBalik).format("DD-MM-YYYY")}</Text>
                                                        <Text>Penalty :Rp.{item.denda}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }
                                    }>
                                </FlatList>
                            </View>
                        </View>
                    )}
            </ScrollView>
        );
    }
}
const mapStateToProps = state => {
    return {
        borrow: state.borrow,
    };
};

export default connect(mapStateToProps)(BorrowList);
const styles = StyleSheet.create({
    searchBar: {
        zIndex: 1,
        backgroundColor: '#fff',
        paddingLeft: 15,
        borderBottomColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 5,
        marginTop: 10,
        marginBottom: 7,
        alignSelf: 'center',
        height: 38,
        width: 307,
        position: 'relative',
        borderRadius: 20
    },

    FlatList: {
        alignSelf: 'center',
    },

    item: {
        backgroundColor: 'black',
        margin: 5,
        borderRadius: 8,
        elevation: 6,
        width: 150,
        height: 215,
    },

    textTitle: {
        fontSize: 10,
        color: 'white',
        alignSelf: 'center',
        paddingBottom: 2,

    },
    textBorrow: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
        paddingBottom: 2,
        backgroundColor: '#000000',
        position: 'absolute',
        zIndex: 1,
        width: 150,
        height: 15,
        marginTop: 195,
    },
    textBorrowed: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'grey',
        position: 'absolute',
        zIndex: 1,
        width: 150,
        height: 15,
        marginTop: 195,
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

    container: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
        padding: 20
    },
})