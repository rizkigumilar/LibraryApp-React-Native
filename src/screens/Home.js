import React, { Component } from 'react';
import Search from '../components/Search'
import List from '../components/ListBook'
import { StatusBar, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default class Home extends Component {
    render() {
        return (
            <ScrollView>
                <View>
                    <StatusBar backgroundColor='white' barStyle='dark-content' />
                    <View>
                        <Search />
                    </View>
                    <View >
                        <List />
                    </View>
                </View>
            </ScrollView>
        );
    }
}