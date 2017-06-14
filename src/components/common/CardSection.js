import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            {props.children}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
    }
});

export { CardSection };
