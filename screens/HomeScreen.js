import { StyleSheet } from 'react-native';
import React from "react";
import { Text, SafeAreaView, View } from "react-native";

export default function HomeScreen({ navigation }) {

    return(
        <SafeAreaView style={styles.container}>
            <Text>TÄHÄN LOGO TMS</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6E6FA',
        alignItems: 'center',
        justifyContent: 'center',
      },
  });