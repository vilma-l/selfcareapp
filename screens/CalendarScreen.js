import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getAllDaily } from '../database';

export default function CalendarScreen() {
    
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        fetchDailyData();
    }, []);

    const fetchDailyData = async () => {
        try {
            const data = await getAllDaily();
            setDailyData(data);
        } catch (error) {
            console.error('Error fetching daily data:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View>
            <Text>Date: {item.date}</Text>
            <Text>Mood: {item.mood}</Text>
            <Text>Hours slept: {item.sleephours}</Text>
            <Text>Quality of sleep: {item.sleepquality}</Text>
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