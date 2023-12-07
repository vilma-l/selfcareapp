import { Alert, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { Button } from '@rneui/themed';
import { Text, TouchableOpacity, SafeAreaView, View} from 'react-native';
import { addDaily } from '../database';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TextBox from '../components/TextBox';

const moodOptions = [
    {name: 'weather-sunny', label: 'Great'},
    {name: 'weather-partly-cloudy', label: 'Good'},
    {name: 'weather-cloudy', label: 'Neutral'},
    {name: 'weather-rainy', label: 'Bad'},
    {name: 'weather-pouring', label: 'Awful'},
]

const sleepOptions = [
    {name: 'emoticon-happy-outline', label: 'Great'},
    {name: 'emoticon-confused-outline', label: 'Okay'},
    {name: 'emoticon-sad-outline', label: 'Bad'},
]

export default function AddDailyScreen({ navigation }) {

    const [mood, setMood] = useState('');
    const [hoursOfSleep, setHoursOfSleep] = useState('');
    const [sleepQuality, setSleepQuality] = useState('');
    //täytyy liittää jotenkin päivään & kalenteriin

    //save the daily statistics
    const saveDaily = async () => {
        if (mood && hoursOfSleep && sleepQuality) {
            const date = new Date().toISOString();
            try {
                await addDaily(date, mood, hoursOfSleep, sleepQuality);
                navigation.navigate('Home');
            } catch (error) {
                console.error('Error saving daily statistics:', error);
            }
        } else {
            Alert.alert('Please fill everything before saving')
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

    //choosing the sleep quality from different options
    const chooseSleepQualityOption = (option) => {
        const isSelected = sleepQuality == option.name;

        return(
            <TouchableOpacity
                key={option.name}
                onPress={() => setSleepQuality(option.name)}
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

    return(
        <SafeAreaView style={styles.container}>
            <TextBox>
                <Text style={styles.text}>How's your mood?</Text>
                <View style={styles.options}>
                    {moodOptions.map((option) => chooseMoodOption(option))}
                </View>
            </TextBox>

            <TextBox>
                <Text style={styles.text}>How many hours did you sleep last night?</Text>
                <View style={styles.options}>
                    <TextInput style={styles.input}
                        placeholder='How many hours did you sleep last night?'
                        keyboardType='numbers-and-punctuation'
                        onChangeText={(text) => setHoursOfSleep(text)}
                        value={hoursOfSleep}
                    />
                </View>
            </TextBox>

            <TextBox>
                <Text style={styles.text}>How was your quality of sleep last night?</Text>
                <View style={styles.options}>
                    {sleepOptions.map((option) => chooseSleepQualityOption(option))}
                </View>
            </TextBox>

            <View>
                <Button
                    icon={{name: 'save'}} 
                    size="lg" 
                    type='outline' 
                    buttonStyle={{ borderColor: '#2f113b' }}
                    titleStyle={{ color: '#2f113b' }} 
                    title=' SAVE' 
                    onPress={saveDaily}
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
    },
    input: {
        height: 40,
        padding: 10,
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