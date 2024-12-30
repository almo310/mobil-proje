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
          Alert.alert('Hata', 'Geçersiz kullanıcı adı veya şifre');
        }
      } else {
        Alert.alert('Hata', 'Kayıtlı kullanıcı bulunamadı');
      }
    } catch (error) {
      Alert.alert('Hata', 'Giriş yapılamadı');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Laboratuvar Sistemi</Text>
      <TextInput
        label="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
        Giriş Yap
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Registration')}
        style={styles.registerButton}
      >
        Kayıt Ol
      </Button>
      <Button
        mode="text"
        onPress={() => Alert.alert('Şifremi Unuttum', 'Şifre sıfırlama bağlantısı gönderildi.')}
        style={styles.forgotButton}
      >
        Şifremi Unuttum
      </Button>
      <Button
        mode="contained"
        onPress={() => Alert.alert('Yardım', 'Destek ekibiyle iletişime geçin.')}
        style={styles.helpButton}
      >
        Yardım
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f1f8e9', // Açık yeşil arka plan rengi
  },
  title: {
    fontSize: 30, // Daha büyük başlık boyutu
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#33691e', // Daha koyu yeşil başlık rengi
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#ffffff', // Beyaz giriş alanı arka planı
    borderRadius: 10, // Daha yuvarlak kenarlar
    padding: 10,
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 12,
    backgroundColor: '#558b2f', // Yeşil tonlu giriş butonu rengi
    borderRadius: 8,
  },
  registerButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderColor: '#33691e', // Kayıt butonu için kenar rengi
    borderWidth: 1,
    borderRadius: 8,
  },
  forgotButton: {
    marginTop: 20,
    paddingVertical: 12,
    color: '#2e7d32', // "Şifremi Unuttum" buton rengi
    textAlign: 'center',
  },
  helpButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#9ccc65', // Yardım butonu için açık yeşil
    borderRadius: 8,
  },
});

export default Login;