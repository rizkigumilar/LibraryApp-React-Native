import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { getBook, getMoreBook } from '../publics/redux/actions/book';



class List extends Component {

    state = {
        books: [],
        isLoading: true,
        page: 1,
        fullField: false
    }

    componentDidMount = async () => {
        this.makeRequest()
        this.subs = [
            this.props.navigation.addListener('willFocus', async () => {
                await this.props.dispatch(getBook());
                this.setState({
                    books: this.props.books,
                })
            }
            )]

    };
    componentWillUnmount = () => {
        this.subs.forEach(sub => {
            sub.remove();
        });
    };

    makeRequest = () => {
        const { page } = this.state
        this.props.dispatch(getMoreBook(page))
            .then(res => {
                this.setState({
                    isLoading: false,
                    books: this.state.book.concat(res.action.payload.data.result)
                })
            }).catch(() => {
                this.setState({ isLoading: false })
            })
    }
    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.makeRequest()
        })
    }
    renderFooter = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                marginVertical: 5
            }}>
                <View>
                    <ActivityIndicator animating size="large" />
                    <Text style={{ marginTop: 10, fontSize: 12 }}>Getting data..</Text>
                </View>
            </View>
        )
    }

    _renderItem = ({ item }) => (
        <View style={{ flex: 1, flexDirection: 'column', margin: 1, marginTop: 30 }}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => { this.props.navigation.navigate('BookDetail', item) }}>
                <Image style={styles.imageThumbnail} source={{ uri: item.image }} />
                {item.StatusBorrow == 0 ? (<Text numberOfLines={1} style={styles.textBorrow}>Available</Text>)
                    : (<Text numberOfLines={1} style={styles.textBorrowed}>Not Available</Text>)}
            </TouchableOpacity>
        </View>
    )
    handlePullRefresh = async () => {
        await this.setState({ isLoading: true })
        await this.props.dispatch(getBook())
            .then(() => {
                this.setState({ page: 1, books: this.props.book, isLoading: false })
            })
    }

    render() {
        // console.log(this.state.books)
        return (
            <View>
                {
                    this.props.book.isFulfilled === false ?
                        (<View style={{ height: 500, width: '100%', flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                            <ActivityIndicator
                                color='black'
                                size="large" />
                        </View>) :
                        (<View style={styles.MainContainer}>
                            <FlatList
                                data={this.state.books}
                                renderItem={this._renderItem}
                                numColumns={2}
                                keyExtractor={(item, index) => index}
                                onEndReached={this.handleLoadMore}
                                onEndReachedThreshold={0.1}
                                ListFooterComponent={this.renderFooter}
                                refreshing={this.state.isLoading}
                                onRefresh={this.handlePullRefresh}
                            />
                        </View>)
                }
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        books: state.book.bookList,
        book: state.book
    };
};

export default connect(mapStateToProps)(withNavigation(List));

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 0,
    },

    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        height: 250,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        borderRadius: 10
    },
    textBorrow: {
        fontSize: 10,
        color: 'black',
        textAlign: 'center',
        paddingBottom: 2,
        backgroundColor: '#00FF00',
        position: 'absolute',
        zIndex: 1,
        width: '80%',
        height: 15,
        marginTop: 220,
        marginLeft: 20
    },
    textBorrowed: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'grey',
        position: 'absolute',
        zIndex: 1,
        width: '80%',
        height: 15,
        marginTop: 220,
        marginLeft: 20
    },
});
