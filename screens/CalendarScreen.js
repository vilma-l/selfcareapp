//NOT DONE

import React, { useState, useEffect } from 'react';
import { Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { getAllMood } from '../database';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TextBox from '../components/TextBox';

const moodOptions = [
    {name: 'weather-sunny', label: 'Great'},
    {name: 'weather-partly-cloudy', label: 'Good'},
    {name: 'weather-cloudy', label: 'Neutral'},
    {name: 'weather-rainy', label: 'Bad'},
    {name: 'weather-pouring', label: 'Awful'},
]

export default function CalendarScreen() {
    
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        fetchDailyData();
    }, []);

    const fetchDailyData = async () => {
        try {
            const moodData = await getAllMood();
            setDailyData(moodData);
        } catch (error) {
            console.error('Error fetching daily data:', error);
        }
    };
    

    const renderItem = ({ item }) => {
        return(
        <SafeAreaView>
            <TextBox>
            <Text>Date: {item.date}</Text>
            <Text>Mood: <MaterialCommunityIcons name={item.mood} size={24} color="black" /></Text>
            </TextBox>
        </SafeAreaView>
        );
    };

    return(
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={dailyData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6E6FA',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
});