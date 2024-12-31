import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminMenu = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Reference Management</Text>
          <Text style={styles.description}>Manage age-specific reference ranges for immunoglobulin tests.</Text>
          <Button
            mode="elevated"
            onPress={() => navigation.navigate('AdminReferenceGuides')}
            style={styles.button}
            icon="file-document-outline"
          >
            Manage References
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Test Results Management</Text>
          <Text style={styles.description}>Enter and manage patient test results with automated validation.</Text>
          <Button
            mode="elevated"
            onPress={() => navigation.navigate('AdminTestInput')}
            style={styles.button}
            icon="clipboard-text"
          >
            Enter Test Results
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Patient Analysis</Text>
          <Text style={styles.description}>Search patients and analyze immunoglobulin trends over time.</Text>
          <Button
            mode="elevated"
            onPress={() => navigation.navigate('PatientSearch')}
            style={styles.button}
            icon="chart-bar"
          >
            Analyze Patients
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>View All Test Results</Text>
          <Text style={styles.description}>View comprehensive test results for all patients.</Text>
          <Button
            mode="elevated"
            onPress={() => navigation.navigate('TestResults')}
            style={styles.button}
            icon="eye"
          >
            View Test Results
          </Button>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={[styles.button, styles.logoutButton]}
        icon="logout"
      >
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 24,
    color: '#3b3b3b',
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#5c6bc0',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#d32f2f',
  },
});

export default AdminMenu;
