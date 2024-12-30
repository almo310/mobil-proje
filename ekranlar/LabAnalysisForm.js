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
      
      // Get existing analyses
      const existingData = await AsyncStorage.getItem('analyses');
      const analyses = existingData ? JSON.parse(existingData) : [];
      
      // Add new analysis
      analyses.push(analysisData);
      
      // Save updated analyses
      await AsyncStorage.setItem('analyses', JSON.stringify(analyses));
      
      alert('Analiz verileri başarıyla kaydedildi!');
      navigation.navigate('TestResults');
    } catch (error) {
      console.error('Analiz verileri kaydedilirken hata oluştu:', error);
      alert('Veriler kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Laboratuvar Analiz Formu</Text>
      
      <View style={styles.patientInfo}>
        <Text style={styles.subtitle}>Hasta Bilgileri:</Text>
        <Text>Ad: {patientData.name}</Text>
        <Text>Yaş: {patientData.age}</Text>
        <Text>Örnek Alma Tarihi: {patientData.sampleDate}</Text>
      </View>

      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title>Test</DataTable.Title>
          <DataTable.Title>Sonuç (mg/dL)</DataTable.Title>
          <DataTable.Title>Referans Aralığı</DataTable.Title>
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
        label="Yorumlar"
        value={labData.comments}
        onChangeText={(text) => setLabData({ ...labData, comments: text })}
        multiline
        numberOfLines={4}
        style={styles.input}
        mode="outlined"
      />
      
      <Button 
        mode="contained" 
        onPress={handleSave}
        style={styles.button}
      >
        Analizi Kaydet
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f8e9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#33691e',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  patientInfo: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  table: {
    marginBottom: 20,
  },
  tableInput: {
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#558b2f',
    borderRadius: 8,
  },
});

export default LabAnalysisForm;