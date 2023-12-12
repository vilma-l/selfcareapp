import { StyleSheet, Alert, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import React, { useState } from "react";
import { addMood } from '../database';
import TextBox from '../components/TextBox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import { format } from 'date-fns';

const moodOptions = [
    {name: 'weather-sunny', label: 'Great'},
    {name: 'weather-partly-cloudy', label: 'Good'},
    {name: 'weather-cloudy', label: 'Neutral'},
    {name: 'weather-rainy', label: 'Bad'},
    {name: 'weather-pouring', label: 'Awful'},
]

export default function AddMoodScreen({ navigation }) {

    const [mood, setMood] = useState('');

    // Save the mood data
    const saveMood = async () => {
        if (mood) {
            const date = format(new Date(), 'MMMM do yyyy, h:mm:ss a');
            try {
                // Save mood data
                await addMood(date, mood);

                navigation.navigate('Affirmations');
    
            } catch (error) {
                console.error('Error saving mood data:', error);
            }
        } else {
            Alert.alert('Please fill everything before saving');
        }
    };

        //choosing the mood from different options
        const chooseMoodOption = (option) => {
            const isSelected = mood === option.name;
        
            return(
                <TouchableOpacity
                    key={option.name}
                    onPress={() => setMood(option.name)}
                    style={{
                        alignItems: 'center',
                        margin: 10,
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: isSelected ? '#e6b4fa' : 'transparent',
                    }}
                >
                    <MaterialCommunityIcons name={option.name} size={28} color='black' />
                    <Text>{option.label}</Text>
                </TouchableOpacity>
            );
        }

    return (
        <SafeAreaView style={styles.container}>
            <TextBox>
            <Text style={styles.text}>How's your mood?</Text>
            <View style={styles.options}>
                {moodOptions.map((option) => chooseMoodOption(option))}
            </View>
            </TextBox>

            <Button
                icon={{name: 'save'}} 
                size="lg" 
                type='outline' 
                buttonStyle={{ borderColor: '#2f113b' }}
                titleStyle={{ color: '#2f113b' }} 
                title=' SAVE' 
                onPress={saveMood}
            />
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