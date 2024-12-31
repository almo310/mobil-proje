import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Switch, Card, Divider, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Registration = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState('');

  const handleRegistration = async () => {
    try {
      if (!username || !password || !confirmPassword || !email || !fullName) {
        Alert.alert('Hata', 'Tüm alanlar doldurulmalıdır.');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Hata', 'Şifreler uyuşmuyor.');
        return;
      }

      if (isAdmin && adminCode !== 'LAB2024') {
        Alert.alert('Hata', 'Geçersiz yönetici kodu.');
        return;
      }

      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const userExists = users.some((user) => user.username === username);
      if (userExists) {
        Alert.alert('Hata', 'Kullanıcı adı zaten mevcut.');
        return;
      }

      const newUser = {
        username,
        password,
        email,
        fullName,
        isAdmin,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      Alert.alert('Başarılı', 'Kayıt başarıyla tamamlandı.', [
        { text: 'Tamam', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Kayıt işlemi başarısız.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Kayıt Ol</Title>
          <Divider style={styles.divider} />

          <TextInput
            label="Ad Soyad"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />

          <TextInput
            label="E-posta"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            label="Kullanıcı Adı"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            label="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            label="Şifreyi Onayla"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />

          <View style={styles.adminSection}>
            <Text>Yönetici Olarak Kayıt Ol</Text>
            <Switch value={isAdmin} onValueChange={setIsAdmin} />
          </View>

          {isAdmin && (
            <TextInput
              label="Yönetici Kodu"
              value={adminCode}
              onChangeText={setAdminCode}
              secureTextEntry
              style={styles.input}
            />
          )}

          <Button mode="contained" onPress={handleRegistration} style={styles.buttonPrimary}>
            Kaydol
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Login')}
            style={styles.buttonSecondary}
          >
            Giriş Ekranına Dön
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e3f2fd',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 3,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0d47a1',
  },
  divider: {
    marginBottom: 20,
    backgroundColor: '#bbdefb',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#f9fbe7',
    borderRadius: 8,
  },
  buttonPrimary: {
    marginTop: 15,
    backgroundColor: '#1e88e5',
    borderRadius: 8,
  },
  buttonSecondary: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#90caf9',
    borderRadius: 8,
  },
  adminSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
});

export default Registration;
