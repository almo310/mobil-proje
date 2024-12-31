import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import Login from './src/screens/Login';
import Registration from './src/screens/Registration';
import PatientForm from './src/screens/PatientForm';
import TestResults from './src/screens/TestResults';
import AdminReferenceGuides from './src/screens/AdminReferenceGuides';
import AdminTestInput from './src/screens/AdminTestInput';
import AdminMenu from './src/screens/AdminMenu';
import PatientSearch from './src/screens/PatientSearch';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#90CAF9',
  },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
};

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
    <Stack.Screen 
      name="Login" 
      component={Login} 
      options={{ title: '' }} 
    />
    <Stack.Screen 
      name="Registration" 
      component={Registration} 
      options={{ title: 'Yeni Hesap Oluştur' }} 
    />
    <Stack.Screen 
      name="PatientForm" 
      component={PatientForm} 
      options={{ title: 'Hasta Bilgileri', headerLeft: null }} 
    />
    <Stack.Screen 
      name="TestResults" 
      component={TestResults} 
      options={{ title: 'Test Sonuçları' }} 
    />
    <Stack.Screen 
      name="AdminMenu" 
      component={AdminMenu} 
      options={{ title: 'Yönetici Paneli', headerLeft: null }} 
    />
    <Stack.Screen 
      name="AdminReferenceGuides" 
      component={AdminReferenceGuides} 
      options={{ title: 'Referans Kılavuz Yönetimi' }} 
    />
    <Stack.Screen 
      name="AdminTestInput" 
      component={AdminTestInput} 
      options={{ title: 'Test Girişi' }} 
    />
    <Stack.Screen 
      name="PatientSearch" 
      component={PatientSearch} 
      options={{ title: 'Hasta Arama ve Trendler' }} 
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
