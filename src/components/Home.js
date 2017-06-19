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
                <Text style={{ marginBottom: 10 }}>
                    {item.text}
                </Text>
                <Text style={{ marginBottom: 10 }}>
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
                <View>
                    <Icon
                        reverse
                        name='clear'
                        color='white'
                        size={40}
                        onPress={() => console.log('hello')}
                        iconStyle={[styles.buttonStyle, styles.nextButtonStyle]}
                        containerStyle={[styles.buttonContainerStyle, styles.nextButtonContainerStyle]}
                    />
                    <Icon
                        reverse
                        name='favorite'
                        color='white'
                        size={40}
                        onPress={() => console.log('hello')}
                        iconStyle={[styles.buttonStyle, styles.likeButtonStyle]}
                        containerStyle={[styles.buttonContainerStyle, styles.likeButtonContainerStyle]}
                    />
                </View>
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
        marginTop: 63,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        height: 480,
        borderBottomWidth: 0,
        shadowOpacity: 0,
    },
    imageStyle: {
        height: 400,
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
    }
});

export default DeckDisplay;
