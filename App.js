import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Deck from './src/components/Deck';
import Router from './src/router';
import { Card, Button } from 'react-native-elements';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers'
import logger from 'redux-logger';
import DATA from './src/reducers/sampleDeck'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class App extends Component {
    renderCard(item) {
        return (
            <Card
                key={item.id}
                image={{ uri: item.uri }}
                containerStyle={styles.cardStyle}
            >
                <Button
                    icon={{ name: 'code' }}
                    backgroundColor='#333333'
                    title={'View'}
                    buttonStyle={
                        {
                            borderRadius: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0,
                        }
                    }
                >
                </Button>
            </Card>
        )
    }

    renderNoMoreCards() {
        return (
            <Card
                title="No More Cards"
                style={styles.card}
            >
                <Text style={{ marginBottom: 10 }}>
                    No more content to display
                </Text>
                <Button
                    title="Get More"
                    backgroundColor="#03A9F4"
                />
            </Card>
        )
    }

    render() {
        const store = createStore(reducers, applyMiddleware(logger));
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cardStyle: {
        flex: 1,
        marginTop: 20,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
    }
});
