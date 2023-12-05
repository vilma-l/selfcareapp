import { Button, StyleSheet } from 'react-native';
import React, { useEffect, useState } from "react";
import { Alert, Text, View, SafeAreaView } from "react-native";
import { AFF_API_URL } from '@env';

export default function AffirmationsScreen({ navigation }) {

    const [affirmation, setAffirmation] = useState('');

    //fetching an affirmation from API
    const getAffirmation = () => {
        fetch(`${AFF_API_URL}`)
        .then(response => response.json())
        .then(data => setAffirmation(data.affirmation))
        .catch(error => {
            Alert.alert('Error', error);
        });
    }

    //load the page with a new affirmation with every refresh
    useEffect(() => {
        getAffirmation();
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{affirmation}</Text>
            <View style={styles.buttons}>
                <Button title='Add Mood' color='#2f113b' onPress={() => navigation.navigate('Today')} />
                <Button title='Home' color='#2f113b' onPress={() => navigation.navigate('Home')} />
            </View>
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
    text: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
  });