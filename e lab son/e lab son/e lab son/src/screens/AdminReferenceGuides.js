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
      console.error('Error during logout:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Manage References</Text>
          <Text style={styles.description}>Edit age-specific reference ranges for immunoglobulin tests.</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('AdminReferenceGuides')}
            style={styles.button}
            icon="folder"
          >
            Manage References
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Test Results Management</Text>
          <Text style={styles.description}>Enter and validate patient test results efficiently.</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('AdminTestInput')}
            style={styles.button}
            icon="clipboard-list"
          >
            Manage Test Results
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Patient Analysis</Text>
          <Text style={styles.description}>Analyze trends and visualize immunoglobulin levels.</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('PatientSearch')}
            style={styles.button}
            icon="chart-pie"
          >
            Patient Trends
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>View All Results</Text>
          <Text style={styles.description}>Review comprehensive test results for all patients.</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('TestResults')}
            style={styles.button}
            icon="eye"
          >
            View Results
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
    backgroundColor: '#e3f2fd',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 24,
    color: '#1e88e5',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#424242',
  },
  description: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 12,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#42a5f5',
    borderRadius: 8,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#d32f2f',
  },
});

export default AdminMenu;
