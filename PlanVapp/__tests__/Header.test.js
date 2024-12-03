import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Header from '../components/Header';

test('renders all filters correctly', () => {
  const { getByText } = render(
    <NavigationContainer>
      <Header />
    </NavigationContainer>
  );

  // Assert all filters are rendered
  expect(getByText('Stays')).toBeTruthy();
  expect(getByText('Flights')).toBeTruthy();
  expect(getByText('Car Rental')).toBeTruthy();
});