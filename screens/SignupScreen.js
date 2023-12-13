import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, TextInput, StyleSheet, View, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { Button } from '@rneui/themed';
import { auth } from '../firebase';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';

export default function SignupScreen() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            navigation.navigate('Login')
        } catch (error) {
            Alert.alert(error.code, error.message);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../logo.png')}
                style={{width: 200, height: 200, marginBottom: 100}}    
            />
            <TextInput
                style={styles.input}
                value={email}
                placeholder='Email address'
                onChangeText={(text) => setEmail(text)}
                autoCapitalize='none'
            />
            <TextInput 
                style={styles.input}
                secureTextEntry
                value={password}
                placeholder='Password'
                onChangeText={(text) => setPassword(text)}
            />
            <Button
                size="lg" 
                type='outline' 
                buttonStyle={{ borderColor: '#2f113b' }}
                titleStyle={{ color: '#2f113b' }}
                title='REGISTER' 
                onPress={onSubmit}
            />
            <View>
                <Text style={styles.text}>Already registered?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: '#2f113b', padding: 10, textAlign: 'center'}}>LOGIN</Text>
                </TouchableOpacity>
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
    text: {
        padding: 10,
    },
  });