import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          await AsyncStorage.setItem('currentUser', JSON.stringify(user));
          if (user.isAdmin) {
            navigation.replace('AdminMenu');
          } else {
            navigation.replace('PatientForm');
          }
        } else {
          Alert.alert('Error', 'Invalid username or password');
        }
      } else {
        Alert.alert('Error', 'No registered users found');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Laboratory System</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Registration')}
        style={styles.registerButton}
      >
        Register
      </Button>
      <Button
        mode="text"
        onPress={() => Alert.alert('Forgot Password', 'A reset link has been sent to your email.')}
        style={styles.forgotButton}
      >
        Forgot Password
      </Button>
      <Button
        mode="contained"
        onPress={() => Alert.alert('Help', 'Contact support for assistance.')}
        style={styles.helpButton}
      >
        Help
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#e3f2fd',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 32,
    color: '#1e88e5',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  loginButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: '#1976d2',
    borderRadius: 8,
  },
  registerButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderColor: '#1565c0',
    borderWidth: 1,
    borderRadius: 8,
  },
  forgotButton: {
    marginTop: 20,
    paddingVertical: 12,
    color: '#1e88e5',
    textAlign: 'center',
  },
  helpButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#64b5f6',
    borderRadius: 8,
  },
});

export default Login;
