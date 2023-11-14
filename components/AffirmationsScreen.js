import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { AFF_API_URL } from '@env';

export default function AffirmationsScreen() {

    const [affirmation, setAffirmation] = useState('');

    const getAffirmation = () => {
        fetch(`${AFF_API_URL}`)
        .then(response => response.json())
        .then(data => setAffirmation(data.affirmation))
        .catch(error => {
            Alert.alert('Error', error);
        });
    }

    useEffect(() => {
        getAffirmation();
    }, []);

    return(
        <View>
            <Text>{affirmation}</Text>
        </View>
    );
}