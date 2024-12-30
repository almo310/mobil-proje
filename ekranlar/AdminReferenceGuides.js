import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Card, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminMenu = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      navigation.replace('Login');
    } catch (error) {
      console.error('Çıkış yaparken hata oluştu:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Yönetici Paneli</Text>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Referans Yönetimi</Text>
          <Text style={styles.description}>
            İmmunoglobulin testleri için yaşa özgü referans aralıklarını yönetin.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('AdminReferenceGuides')}
            style={styles.button}
            icon="book-open-variant"
          >
            Referans Kılavuzlarını Yönet
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Test Sonuçları Yönetimi</Text>
          <Text style={styles.description}>
            Hasta test sonuçlarını otomatik doğrulama ile girin ve yönetin.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('AdminTestInput')}
            style={styles.button}
            icon="database-plus"
          >
            Test Sonuçlarını Gir
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Hasta Analizi</Text>
          <Text style={styles.description}>
            Hastaları arayın ve zaman içindeki immunoglobulin eğilimlerini analiz edin.
            Renk kodlu değişiklikleri (↑↓↔) ve yüzdelik farkları görüntüleyin.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('PatientSearch')}
            style={styles.button}
            icon="trending-up"
          >
            Hasta Eğilim Analizi
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Test Sonuçları Genel Görünümü</Text>
          <Text style={styles.description}>
            Tüm hastalar için kapsamlı test sonuçlarını görüntüleyin.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('TestResults')}
            style={styles.button}
            icon="chart-line"
          >
            Tüm Test Sonuçlarını Görüntüle
          </Button>
        </Card.Content>
      </Card>

      <Button
        mode="outlined"
        onPress={handleLogout}
        style={[styles.button, styles.logoutButton]}
        icon="logout"
      >
        Çıkış Yap
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f8e9', // Açık yeşil arka plan rengi
  },
  title: {
    fontSize: 28, // Daha büyük başlık boyutu
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#33691e', // Daha koyu yeşil başlık rengi
  },
  card: {
    marginBottom: 20,
    elevation: 4,
    backgroundColor: '#ffffff', // Kartlar için beyaz arka plan
    borderRadius: 10, // Kart kenarları yuvarlak
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2e7d32', // Yeşil tonlu başlık rengi
  },
  description: {
    fontSize: 14,
    color: '#4caf50', // Yeşil tonlu açıklama rengi
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
    paddingVertical: 10,
    backgroundColor: '#558b2f', // Butonlar için yeşil renk
    borderRadius: 8,
  },
  logoutButton: {
    marginTop: 10,
    marginBottom: 24,
    backgroundColor: '#d32f2f', // Çıkış butonu için kırmızı renk
  },
});

export default AdminMenu;
