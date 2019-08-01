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
import { getBook } from '../publics/redux/actions/book';



class List extends Component {

    state = {
        books: [],
    }

    componentDidMount = async () => {
        await this.props.dispatch(getBook());
        this.setState({
            books: this.props.books,
        });
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

    _renderItem = ({ item }) => (
        <View style={{ flex: 1, flexDirection: 'column', margin: 1, marginTop: 30 }}>
            <TouchableOpacity activeOpacity={1} onPress={() => { this.props.navigation.navigate('BookDetail', item) }}>
                <Image style={styles.imageThumbnail} source={{ uri: item.image }} />
            </TouchableOpacity>

        </View>
    )

    render() {
        // console.log(this.state.books)
        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={this.state.books}
                    renderItem={this._renderItem}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        books: state.book.bookList
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
});
