import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText, Card, Title, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAgeGroup } from '../constants/referenceRanges';

const PatientForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientId.trim()) newErrors.patientId = 'Hasta ID gerekli';
    if (!formData.firstName.trim()) newErrors.firstName = 'Ad gerekli';
    if (!formData.lastName.trim()) newErrors.lastName = 'Soyad gerekli';
    if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Doğum tarihi gerekli';

    const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (formData.dateOfBirth && !dobPattern.test(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Format YYYY-MM-DD olmalıdır';
    }

    if (formData.contactNumber && !/^\+?[\d\s-]{10,}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Geçersiz telefon numarası';
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçersiz e-posta adresi';
    }

    if (formData.emergencyContact.phone && !/^\+?[\d\s-]{10,}$/.test(formData.emergencyContact.phone)) {
      newErrors.emergencyContactPhone = 'Geçersiz acil durum telefon numarası';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const age = calculateAge(formData.dateOfBirth);
      const ageGroup = getAgeGroup(age);

      const patientData = {
        ...formData,
        age,
        ageGroup,
        registrationDate: new Date().toISOString(),
      };

      const existingData = await AsyncStorage.getItem('patients');
      const patients = existingData ? JSON.parse(existingData) : [];

      if (patients.some(p => p.patientId === patientData.patientId)) {
        setErrors({ patientId: 'Hasta ID zaten mevcut' });
        setLoading(false);
        return;
      }

      patients.push(patientData);
      await AsyncStorage.setItem('patients', JSON.stringify(patients));

      setFormData({
        patientId: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        contactNumber: '',
        email: '',
        address: '',
        medicalHistory: '',
        currentMedications: '',
        allergies: '',
        emergencyContact: {
          name: '',
          relationship: '',
          phone: ''
        }
      });

      navigation.navigate('Home');
    } catch (error) {
      console.error('Hasta kaydedilirken hata oluştu:', error);
      setErrors({ submit: 'Hasta verileri kaydedilemedi' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Hasta Bilgileri</Title>
          <Divider style={styles.divider} />

          <TextInput
            label="Hasta ID *"
            value={formData.patientId}
            onChangeText={(text) => setFormData({ ...formData, patientId: text })}
            error={!!errors.patientId}
            style={styles.input}
          />
          <HelperText type="error" visible={!!errors.patientId}>
            {errors.patientId}
          </HelperText>

          <TextInput
            label="Ad *"
            value={formData.firstName}
            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            error={!!errors.firstName}
            style={styles.input}
          />
          <HelperText type="error" visible={!!errors.firstName}>
            {errors.firstName}
          </HelperText>

          <TextInput
            label="Soyad *"
            value={formData.lastName}
            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            error={!!errors.lastName}
            style={styles.input}
          />
          <HelperText type="error" visible={!!errors.lastName}>
            {errors.lastName}
          </HelperText>

          <TextInput
            label="Doğum Tarihi * (YYYY-MM-DD)"
            value={formData.dateOfBirth}
            onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
            error={!!errors.dateOfBirth}
            style={styles.input}
          />
          <HelperText type="error" visible={!!errors.dateOfBirth}>
            {errors.dateOfBirth}
          </HelperText>

          <TextInput
            label="Cinsiyet"
            value={formData.gender}
            onChangeText={(text) => setFormData({ ...formData, gender: text })}
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>İletişim Bilgileri</Title>
          <Divider style={styles.divider} />

          <TextInput
            label="Telefon"
            value={formData.contactNumber}
            onChangeText={(text) => setFormData({ ...formData, contactNumber: text })}
            error={!!errors.contactNumber}
            style={styles.input}
          />
          <HelperText type="error" visible={!!errors.contactNumber}>
            {errors.contactNumber}
          </HelperText>

          <TextInput
            label="E-posta"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            error={!!errors.email}
            style={styles.input}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>

          <TextInput
            label="Adres"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Sağlık Bilgileri</Title>
          <Divider style={styles.divider} />

          <TextInput
            label="Tıbbi Geçmiş"
            value={formData.medicalHistory}
            onChangeText={(text) => setFormData({ ...formData, medicalHistory: text })}
            multiline
            numberOfLines={4}
            style={styles.input}
          />

          <TextInput
            label="Mevcut İlaçlar"
            value={formData.currentMedications}
            onChangeText={(text) => setFormData({ ...formData, currentMedications: text })}
            multiline
            numberOfLines={3}
            style={styles.input}
          />

          <TextInput
            label="Alerjiler"
            value={formData.allergies}
            onChangeText={(text) => setFormData({ ...formData, allergies: text })}
            multiline
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Acil Durum İletişim</Title>
          <Divider style={styles.divider} />

          <TextInput
            label="Ad"
            value={formData.emergencyContact.name}
            onChangeText={(text) =>
              setFormData({
                ...formData,
                emergencyContact: { ...formData.emergencyContact, name: text }
              })
            }
            style={styles.input}
          />

          <TextInput
            label="İlişki"
            value={formData.emergencyContact.relationship}
            onChangeText={(text) =>
              setFormData({
                ...formData,
                emergencyContact: { ...formData.emergencyContact, relationship: text }
              })
            }
            style={styles.input}
          />

          <TextInput
            label="Telefon"
            value={formData.emergencyContact.phone}
            onChangeText={(text) =>
              setFormData({
                ...formData,
                emergencyContact: { ...formData.emergencyContact, phone: text }
              })
            }
            error={!!errors.emergencyContactPhone}
            style={styles.input}
          />
          <HelperText type="error" visible={!!errors.emergencyContactPhone}>
            {errors.emergencyContactPhone}
          </HelperText>
        </Card.Content>
      </Card>

      {errors.submit && (
        <Text style={styles.errorText}>{errors.submit}</Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.submitButton}
      >
        Hastayı Kaydet
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('Home')}
        style={styles.cancelButton}
      >
        Ana Sayfaya Dön
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
  card: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  divider: {
    marginVertical: 10,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  errorText: {
    color: '#B00020',
    marginBottom: 16,
    textAlign: 'center',
  },
  submitButton: {
    marginVertical: 16,
    paddingVertical: 10,
    backgroundColor: '#558b2f',
    borderRadius: 8,
  },
  cancelButton: {
    marginTop: 8,
    paddingVertical: 10,
  },
});

export default PatientForm;
