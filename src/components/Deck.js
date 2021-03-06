import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }

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
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });

        this.state = { panResponder, position, index: 0 };
    }


    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.state.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction))
    }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const card = data[this.state.index];

        direction === 'right' ? onSwipeRight(card) : onSwipeLeft(card);
        this.state.position.setValue({ x: 0, y: 0 });
        this.setState({ index: this.state.index + 1 })
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 5, 0, SCREEN_WIDTH * 5],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...this.state.position.getLayout(),
            transform: [{ rotate }]
        }
    }


    renderCards() {
        if(this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }

        return this.props.data.map((card, i) => {
            // console.log(i, this.state.index);
            if(i < this.state.index) { return null; }
            if(i === this.state.index) {
                return (
                    <Animated.View
                        key={card.id}
                        {...this.state.panResponder.panHandlers}
                        style={[this.getCardStyle(), styles.cardStyle]}
                    >
                        {this.props.renderCard(card)}
                    </Animated.View>
                );
            }
            return (
                <Animated.View
                    key={card.id}
                    style={styles.cardStyle}>
                    {this.props.renderCard(card)}
                </Animated.View>
            )
        }).reverse();
    }

    render() {
        return (
            <View>
                {this.renderCards()}
                <View>
                    <Icon
                        reverse
                        name='clear'
                        color='white'
                        size={34}
                        onPress={() => this.forceSwipe('left')}
                        iconStyle={[styles.buttonStyle, styles.nextButtonStyle]}
                        containerStyle={[styles.buttonContainerStyle, styles.nextButtonContainerStyle]}
                    />
                    <Icon
                        reverse
                        name='favorite'
                        color='white'
                        size={34}
                        onPress={() => this.forceSwipe('right')}
                        iconStyle={[styles.buttonStyle, styles.likeButtonStyle]}
                        containerStyle={[styles.buttonContainerStyle, styles.likeButtonContainerStyle]}
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        borderBottomWidth: 0
    },
    buttonStyle: {},
    buttonContainerStyle: {
        top: 570,
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
};

export default Deck;