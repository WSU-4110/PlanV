// AnimalSelection.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from '../components/Header';  
import Initial from './Booking/InitialBooking'; 

function AnimalSelection() {
    const [selectedAnimal, setSelectedAnimal] = useState('');
  
    const handleSelectAnimal = (animal) => {
      setSelectedAnimal(animal);
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Header onSelectAnimal={handleSelectAnimal} />
        <Initial selectedAnimal={selectedAnimal} />
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  
  export default AnimalSelection;
