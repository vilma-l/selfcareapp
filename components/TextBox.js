// Created with some help from here: 
// https://allbitsequal.medium.com/a-flexible-view-box-with-custom-border-images-in-react-native-99cf3439bc07

import React from 'react'
import { View, StyleSheet } from 'react-native'

const TextBox = ({ children }) => (
    <View style={styles.textBox}>
    {children}
    </View>
)

const styles = StyleSheet.create({
    textBox: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 10,
        margin: 20,
    },
});

export default TextBox;