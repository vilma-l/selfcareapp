import React, { useEffect, useState } from "react";
import { Alert, Text, View, SafeAreaView, StyleSheet } from "react-native";
import { Button } from '@rneui/themed';
import { AFF_API_URL } from '@env';
import {auth} from '../firebase';
import { signOut } from 'firebase/auth';

export default function AffirmationsScreen({ navigation }) {

    const [affirmation, setAffirmation] = useState('');

    //fetching an affirmation from API
    const getAffirmation = () => {
        fetch(`${AFF_API_URL}`)
        .then(response => response.json())
        .then(data => setAffirmation(data.affirmation))
        .catch(error => {
            Alert.alert('Error finding an affirmation: ', error);
        });
    }

    //load the page with a new affirmation with every refresh
    useEffect(() => {
        getAffirmation();
    }, []);

    const handleLogout = () => {
        signOut(auth)
        .then(() => navigation.navigate('Login'))
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{affirmation}</Text>
            <View style={styles.buttons}>
                <Button title='Track your mood' color='#2f113b' onPress={() => navigation.navigate('Mood Tracker')} />
                <Button title='Log your sleep' color='#2f113b' onPress={() => navigation.navigate('Sleep Tracker')} />
                <Button title='Routines' color='#2f113b' onPress={() => navigation.navigate('Routines')} />
            </View>
            <View style={styles.buttons}>
                <Button title='LOGOUT' color='#2f113b' onPress={handleLogout} />
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
      padding: 20,
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
    options: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
  });