import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Card, Searchbar, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminTestInput = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [testData, setTestData] = useState({
    IgG: '',
    IgA: '',
    IgM: '',
    IgE: '',
    comments: '',
  });

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const testResults = await AsyncStorage.getItem('testResults');
      if (testResults) {
        const results = JSON.parse(testResults);
        const uniquePatients = Array.from(
          new Set(results.map(r => r.patientId))
        ).map(id => {
          const patient = results.find(r => r.patientId === id);
          return {
            patientId: id,
            patientName: patient.patientName,
            age: patient.age,
            gender: patient.gender,
          };
        });
        setPatients(uniquePatients);
        setFilteredPatients(uniquePatients);
      }
    } catch (error) {
      Alert.alert('Hata', 'Hastalar yüklenirken hata oluştu');
    }
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    const filtered = patients.filter(
      (patient) =>
        patient.patientName.toLowerCase().includes(query.toLowerCase()) ||
        patient.patientId.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const selectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery('');
  };

  const validateTestData = () => {
    const values = {
      IgG: parseFloat(testData.IgG),
      IgA: parseFloat(testData.IgA),
      IgM: parseFloat(testData.IgM),
      IgE: parseFloat(testData.IgE),
    };

    for (const [key, value] of Object.entries(values)) {
      if (isNaN(value) || value < 0) {
        Alert.alert('Hata', `Geçersiz ${key} değeri`);
        return false;
      }
    }

    return true;
  };

  const saveTestResults = async () => {
    try {
      if (!selectedPatient) {
        Alert.alert('Hata', 'Lütfen bir hasta seçin');
        return;
      }

      if (!validateTestData()) {
        return;
      }

      const newTest = {
        ...selectedPatient,
        ...testData,
        testId: `TEST-${Date.now()}`,
        date: new Date().toISOString(),
      };

      const existingResults = await AsyncStorage.getItem('testResults');
      const results = existingResults ? JSON.parse(existingResults) : [];
      results.push(newTest);

      await AsyncStorage.setItem('testResults', JSON.stringify(results));
      Alert.alert(
        'Başarılı',
        'Test sonuçları başarıyla kaydedildi',
        [
          { text: 'Sonuçları Gör', onPress: () => navigation.navigate('TestResults') },
          { text: 'Yeni Test', onPress: () => resetForm() },
        ]
      );
    } catch (error) {
      Alert.alert('Hata', 'Test sonuçları kaydedilirken hata oluştu');
    }
  };

  const resetForm = () => {
    setSelectedPatient(null);
    setTestData({
      IgG: '',
      IgA: '',
      IgM: '',
      IgE: '',
      comments: '',
    });
  };

  return (
    <ScrollView style={styles.container}>
      {!selectedPatient ? (
        <View>
          <Searchbar
            placeholder="Hasta adı veya ID ile arama yapın"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
          />
          <Card style={styles.card}>
            <Card.Content>
              <List.Section>
                {filteredPatients.map((patient, index) => (
                  <List.Item
                    key={index}
                    title={patient.patientName}
                    description={`ID: ${patient.patientId} | Yaş: ${patient.age} | Cinsiyet: ${patient.gender}`}
                    onPress={() => selectPatient(patient)}
                    left={props => <List.Icon {...props} icon="account" />}
                  />
                ))}
              </List.Section>
            </Card.Content>
          </Card>
        </View>
      ) : (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.patientInfo}>
              Hasta: {selectedPatient.patientName}
            </Text>
            <Text style={styles.patientInfo}>
              ID: {selectedPatient.patientId} | Yaş: {selectedPatient.age} | Cinsiyet: {selectedPatient.gender}
            </Text>

            <TextInput
              label="IgG (mg/dL)"
              value={testData.IgG}
              onChangeText={(value) => setTestData({ ...testData, IgG: value })}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              label="IgA (mg/dL)"
              value={testData.IgA}
              onChangeText={(value) => setTestData({ ...testData, IgA: value })}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              label="IgM (mg/dL)"
              value={testData.IgM}
              onChangeText={(value) => setTestData({ ...testData, IgM: value })}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              label="IgE"
              value={testData.IgE}
              onChangeText={(value) => setTestData({ ...testData, IgE: value })}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              label="Yorumlar"
              value={testData.comments}
              onChangeText={(value) => setTestData({ ...testData, comments: value })}
              multiline
              numberOfLines={4}
              style={styles.input}
            />

            <Button mode="contained" onPress={saveTestResults} style={styles.button}>
              Test Sonuçlarını Kaydet
            </Button>

            <Button
              mode="outlined"
              onPress={() => setSelectedPatient(null)}
              style={styles.button}
            >
              Farklı Hasta Seç
            </Button>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f8e9',
  },
  searchBar: {
    marginBottom: 10,
    borderRadius: 8,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
  },
  patientInfo: {
    fontSize: 16,
    marginBottom: 10,
    color: '#33691e',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#558b2f',
    borderRadius: 8,
  },
});

export default AdminTestInput;