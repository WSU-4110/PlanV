import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';  // Import 'screen'
import { NavigationContainer } from '@react-navigation/native'; // Wrapping in NavigationContainer
import Header from '../components/Header';

test('buttons toggle border correctly when clicked', () => {
  render(
    <NavigationContainer>
      <Header />
    </NavigationContainer>
  );

  // Get all buttons
  const hotelButton = screen.getByTestId('hotelButton');
  const flightButton = screen.getByTestId('flightButton');
  const carButton = screen.getByTestId('carButton');

  // Click on the "Flight" button
  fireEvent.press(flightButton);

  // Check that the "Flight" button now has a border
  expect(flightButton.props.style.borderColor).toBe('white');
  
  // Check that the "Hotel" button no longer has a border
  expect(hotelButton.props.style.borderColor).toBe('transparent');

  // Click on the "Car" button
  fireEvent.press(carButton);

  // Check that the "Car" button now has a border
  expect(carButton.props.style.borderColor).toBe('white');
  
  // Check that the "Flight" button no longer has a border
  expect(flightButton.props.style.borderColor).toBe('transparent');
});

