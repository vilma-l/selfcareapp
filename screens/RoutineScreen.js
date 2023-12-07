import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Switch, FlatList, SafeAreaView } from 'react-native';
import { Button } from '@rneui/themed';
import { db } from "../database";

export default function RoutineScreen() {

    const [routines, setRoutines] = useState([]);
    const [newRoutine, setNewRoutine] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM routine', [], (_, { rows }) => {
                const data = rows._array;
                setRoutines(data);
            },
            (error) => {
                console.error('Error fetching data:', error);
            });
        });
    };

    const addRoutine = () => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO routine (routine_name, completed) VALUES (?, 0)', [newRoutine], (_, { insertId }) => {
                fetchData();
                setNewRoutine('');
            },
            (error) => {
                console.error('Error adding routine:', error);
            });
        });
    };

    const updateCompleted = (id, completed) => {
        db.transaction((tx) => {
            tx.executeSql('UPDATE routine SET completed = ? WHERE id = ?', [completed ? 0 : 1, id], () => {
                fetchData();
            },
            (error) => {
                console.error('Error updating completed status:', error);
            });
        });
    };

    const renderItem = ({ item }) => (
        <View style={styles.listcontainer}>
            <Text style={{fontSize: 20}}>{item.routine_name}</Text>
            <Button 
                title={item.completed ? 'Undo' : 'Completed'} 
                onPress={() => updateCompleted(item.id, item.completed)}
            />
        </View>
    );

    const listSeparator = () => {
        return (
            <View style={styles.separator}/>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Daily Routines</Text>

            <FlatList 
                data={routines}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={listSeparator}
            />
            <TextInput 
                style={styles.input}
                placeholder="New Routine"
                value={newRoutine}
                onChangeText={(text) => setNewRoutine(text)}
            />
            <Button
                icon={{name: 'save'}} 
                size="lg" 
                type='outline' 
                buttonStyle={{ borderColor: '#2f113b' }}
                titleStyle={{ color: '#2f113b' }} 
                title=' SAVE' 
                onPress={addRoutine}
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
      separator: {
        height: 1,
        width: '80%',
        backgroundColor: '#e6b4fa',
        marginLeft: '10%',
      },
      input: {
        margin: 10,
        fontSize: 20,
        width: 200,
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
      },
      listcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },
  });