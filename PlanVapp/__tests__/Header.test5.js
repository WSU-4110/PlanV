import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';  // Import 'screen'
import { NavigationContainer } from '@react-navigation/native'; // Wrapping in NavigationContainer
import Header from '../components/Header';

test('initially, the Hotel button has a border and others do not', () => {
  render(
    <NavigationContainer>
      <Header />
    </NavigationContainer>
  );

  // Check that the "Hotel" button has a border initially
  const hotelButton = screen.getByTestId('hotelButton');
  expect(hotelButton.props.style.borderColor).toBe('white');

  // Check that the "Flight" button does not have a border initially
  const flightButton = screen.getByTestId('flightButton');
  expect(flightButton.props.style.borderColor).toBe('transparent');

  // Check that the "Car" button does not have a border initially
  const carButton = screen.getByTestId('carButton');
  expect(carButton.props.style.borderColor).toBe('transparent');
});
