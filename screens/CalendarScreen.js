//NOT DONE

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getAllMood } from '../database';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
            const data = await getAllMood();
            setDailyData(data);
        } catch (error) {
            console.error('Error fetching daily data:', error);
        }
    };

    const getMoodIcon = (moodName) => {
        const mood = moodOptions.find((option) => option.name === moodName);
        return mood ? mood.name : 'head-question-outline'; // Default icon if mood is not found
    };

    const renderItem = ({ item }) => (
        <View>
            <Text>Date: {item.date}</Text>
            <Text>Mood: {item.mood.label}</Text>
            <MaterialCommunityIcons name={getMoodIcon(item.mood.name)} size={24} color="black" />
        </View>
    );

    return(
        <View>
            <FlatList 
                data={dailyData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};