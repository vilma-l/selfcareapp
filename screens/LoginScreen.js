import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView, TextInput, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button } from '@rneui/themed';

export default function LoginScreen() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            navigation.navigate('Affirmations');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert('Login Error:', errorCode, errorMessage);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
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
                title='LOGIN' 
                onPress={onLogin}
            />
            <View>
                <Text>Not registered yet?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{color: '#2f113b'}}>Register here</Text>
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
  });