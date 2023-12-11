import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, FlatList, SafeAreaView, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import { db } from "../database";

export default function RoutineScreen() {

    const [routines, setRoutines] = useState([]);
    const [newRoutine, setNewRoutine] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM routine', [], (_, { rows }) => {
                const data = rows._array.map((item) => {
                    if (item.last_updated !== currentDate) {
                        updateCompleted(item.id, false);
                        item.completed = false;
                        tx.executeSql('UPDATE routine SET last_updated = ? WHERE id = ?', [currentDate, item.id]);
                    }
                    return item;
                });
                setRoutines(data);
            },
            (error) => {
                Alert.alert('Error fetching data:', error);
            });
        });
    };

    const addRoutine = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO routine (routine_name, completed, last_updated) VALUES (?, ?, ?)',
                [newRoutine, 0, currentDate],
                (_, { insertId }) => {
                    fetchData();
                    setNewRoutine('');
                },
                (error) => {
                    console.error('Error adding routine:', error);
                }
            );
        });
    };

    const updateCompleted = (id, completed) => {
        db.transaction((tx) => {
            tx.executeSql('UPDATE routine SET completed = ? WHERE id = ?', [completed ? 0 : 1, id], () => {
                fetchData();
            },
            (error) => {
                Alert.alert('Error updating completed status:', error);
            });
        });
    };
    
    const deleteRoutine = (id) => {
        db.transaction(
            tx => {
                tx.executeSql('DELETE FROM routine WHERE id = ?;', [id], () => {
                    fetchData();
                });
            },
            (error) => {
                Alert.alert('Error deleting routine:', error);
            }
        );
    }
    
    const renderItem = ({ item }) => (
        <View style={styles.listcontainer}>
            <Text style={{ fontSize: 20, padding: 10 }}>{item.routine_name}</Text>
            <Button
                size="lg" 
                type='outline' 
                buttonStyle={{ borderColor: '#2f113b' }}
                titleStyle={{ color: '#2f113b' }} 
                title={item.completed ? 'Not done ✗' : 'Done for today ✓'}
                onPress={() => updateCompleted(item.id, item.completed)}
            />
            <Button 
                icon={{name: "delete"}}
                size="lg"
                type="outline"
                buttonStyle={{ borderColor: '#2f113b' }}
                titleStyle={{ color: '#2f113b' }}
                onPress={() => deleteRoutine(item.id)} 
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
        marginBottom: 30,
        fontSize: 20,
        width: 300,
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
      },
      listcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        margin: 10,
      },
  });