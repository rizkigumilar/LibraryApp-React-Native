import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';


class SearchBar extends Component {
    render() {
        return (
            <Container style={{ height: 70 }}>
                <Header searchBar rounded style={{ backgroundColor: 'white', borderRadius: 8, width: '95%', marginTop: 10, marginLeft: 10, height: 50 }}>
                    <Item>
                        <Input placeholder="Search" />
                        <Icon name="ios-search" />
                    </Item>
                </Header>
            </Container>
        );
    }
}

export default SearchBar