import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Header from '../components/Header';

test('clicking on filter buttons updates state and triggers navigation', () => {
  const { getByTestId } = render(
    <NavigationContainer>
      <Header />
    </NavigationContainer>
  );

  // Simulate click on "Flight" button
  const flightButton = getByTestId('flightButton');
  fireEvent.press(flightButton);

  // Ensure the "Flight" filter is selected
  expect(flightButton.props.style.borderColor).toBe('white');

  // Simulate click on "Hotel" button
  const hotelButton = getByTestId('hotelButton');
  fireEvent.press(hotelButton);

  // Ensure the "Hotel" filter is selected
  expect(hotelButton.props.style.borderColor).toBe('white');

  // Simulate click on "Car Rental" button
  const carButton = getByTestId('carButton');
  fireEvent.press(carButton);

  // Ensure the "Car Rental" filter is selected
  expect(carButton.props.style.borderColor).toBe('white');
});
