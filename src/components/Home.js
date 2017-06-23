import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Deck from '../components/Deck';
import { Card, Button, Icon } from 'react-native-elements';
import logger from 'redux-logger';
import DATA from '../reducers/sampleDeck'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class DeckDisplay extends Component {
    renderCard(item) {
        return (
            <Card
                key={item.id}
                image={{ uri: item.uri }}
                imageStyle={styles.imageStyle}
                containerStyle={styles.cardStyle}
            >
                <Text style={styles.cardTitle}>
                    {item.text}
                </Text>
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
        return (
            <View style={styles.container}>
                <Deck
                    data={DATA}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edecf5',
    },
    cardStyle: {
        marginTop: 73,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 0,
        height: 490,
        borderBottomWidth: 0,
        shadowOpacity: 0,
        borderRadius: 30,
    },
    imageStyle: {
        height: 490,
        borderRadius: 30,
    },
    buttonStyle: {},
    buttonContainerStyle: {
        top: 550,
    },
    likeButtonStyle: {
        color: '#f54e52'
    },
    nextButtonStyle: {
        color: '#4469f5'
    },
    likeButtonContainerStyle: {
        position: 'absolute',
        right: 80,
        bottom: 0,
    },
    nextButtonContainerStyle: {
        position: 'absolute',
        left: 80,
        bottom: 0,
    },
    cardTitle: {
        fontSize: 28
    }
});

export default DeckDisplay;
