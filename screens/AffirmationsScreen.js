import React, { useEffect, useState } from "react";
import { Alert, Text, View, SafeAreaView, StyleSheet, Image } from "react-native";
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
            <Text style={{ fontSize: 30, textAlign: 'center', padding: 10, marginBottom: 50 }}>{affirmation}</Text>
            <Image
                source={require('../logo.png')}
                style={{width: 250, height: 250, marginBottom: 40}}    
            />
            <View style={styles.buttons}>
                <Button
                    size='md'
                    type='outline'
                    buttonStyle={{ borderColor: '#2f113b' }}
                    titleStyle={{ color: '#2f113b' }}
                    title='Track your mood' 
                    onPress={() => navigation.navigate('Mood Tracker')}
                />
                <Button
                    size='md'
                    type='outline'
                    buttonStyle={{ borderColor: '#2f113b' }}
                    titleStyle={{ color: '#2f113b' }}
                    title='Log your sleep' 
                    onPress={() => navigation.navigate('Sleep Tracker')}
                />
                <Button
                    size='md'
                    type='outline'
                    buttonStyle={{ borderColor: '#2f113b' }}
                    titleStyle={{ color: '#2f113b' }}
                    title='Routines' 
                    onPress={() => navigation.navigate('Routines')}
                />
            </View>
            <View style={styles.buttons}>
                <Button
                    size='lg'
                    type='outline'
                    buttonStyle={{ borderColor: '#2f113b' }}
                    titleStyle={{ color: '#2f113b' }}
                    title='LOGOUT' 
                    onPress={handleLogout} 
                />
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 60,
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