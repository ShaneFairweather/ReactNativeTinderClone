import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

class Deck extends Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: (event, gesture) => {
                if(gesture.dx > SWIPE_THRESHOLD) {
                    console.log('like')
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    console.log('dislike')
                }
                this.resetPosition();
            }
        });

        this.state = { panResponder, position };
    }

    resetPosition() {
        this.position = new Animated.ValueXY(0, 0);
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...this.state.position.getLayout(),
            transform: [{ rotate }]
        }
    }

    renderCards() {
        return this.props.data.map((card, index) => {
            if(index === 0) {
                return (
                    <Animated.View
                        key={card.id}
                        {...this.state.panResponder.panHandlers}
                        style={this.getCardStyle()}
                    >
                        {this.props.renderCard(card)}
                    </Animated.View>
                )
            }
            return this.props.renderCard(card);
        })
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        )
    }
}

export default Deck;