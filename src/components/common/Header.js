import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Header = (props) => {
    const { text, view } = styles;

    return (
        <View style={view}>
            <Text style={text}>{props.title}</Text>
        </View>
    );
}

export { Header };

const styles = StyleSheet.create({
    view: {
        height: 60,
        backgroundColor: '#f8f8f8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        paddingTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        position: 'relative',

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
    }
});