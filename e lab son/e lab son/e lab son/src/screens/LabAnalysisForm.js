import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LabAnalysisForm = ({ route, navigation }) => {
  const { patientData } = route.params;
  const [labData, setLabData] = useState({
    igG: '',
    igA: '',
    igM: '',
    igE: '',
    comments: '',
    analysisDate: new Date().toISOString().split('T')[0],
  });

  const handleSave = async () => {
    try {
      const analysisData = {
        patientData,
        labData,
        timestamp: new Date().toISOString(),
      };

      const existingData = await AsyncStorage.getItem('analyses');
      const analyses = existingData ? JSON.parse(existingData) : [];

      analyses.push(analysisData);

      await AsyncStorage.setItem('analyses', JSON.stringify(analyses));

      alert('Analysis data saved successfully!');
      navigation.navigate('TestResults');
    } catch (error) {
      console.error('Error saving analysis data:', error);
      alert('An error occurred while saving the data. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Laboratory Analysis Form</Text>

      <View style={styles.patientInfo}>
        <Text style={styles.subtitle}>Patient Information:</Text>
        <Text>Name: {patientData.name}</Text>
        <Text>Age: {patientData.age}</Text>
        <Text>Sample Date: {patientData.sampleDate}</Text>
      </View>

      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title>Test</DataTable.Title>
          <DataTable.Title>Result (mg/dL)</DataTable.Title>
          <DataTable.Title>Reference Range</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>IgG</DataTable.Cell>
          <DataTable.Cell>
            <TextInput
              value={labData.igG}
              onChangeText={(text) => setLabData({ ...labData, igG: text })}
              keyboardType="numeric"
              style={styles.tableInput}
              mode="outlined"
            />
          </DataTable.Cell>
          <DataTable.Cell>700-1600</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>IgA</DataTable.Cell>
          <DataTable.Cell>
            <TextInput
              value={labData.igA}
              onChangeText={(text) => setLabData({ ...labData, igA: text })}
              keyboardType="numeric"
              style={styles.tableInput}
              mode="outlined"
            />
          </DataTable.Cell>
          <DataTable.Cell>70-400</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>IgM</DataTable.Cell>
          <DataTable.Cell>
            <TextInput
              value={labData.igM}
              onChangeText={(text) => setLabData({ ...labData, igM: text })}
              keyboardType="numeric"
              style={styles.tableInput}
              mode="outlined"
            />
          </DataTable.Cell>
          <DataTable.Cell>40-230</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>IgE</DataTable.Cell>
          <DataTable.Cell>
            <TextInput
              value={labData.igE}
              onChangeText={(text) => setLabData({ ...labData, igE: text })}
              keyboardType="numeric"
              style={styles.tableInput}
              mode="outlined"
            />
          </DataTable.Cell>
          <DataTable.Cell>{'<100'}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <TextInput
        label="Comments"
        value={labData.comments}
        onChangeText={(text) => setLabData({ ...labData, comments: text })}
        multiline
        numberOfLines={4}
        style={styles.input}
        mode="outlined"
      />

      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save Analysis
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f4f6f8',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0d47a1',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#37474f',
  },
  patientInfo: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 2,
  },
  table: {
    marginBottom: 20,
  },
  tableInput: {
    height: 40,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#1e88e5',
    borderRadius: 8,
  },
});

export default LabAnalysisForm;
