import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

// Mock the navigation hook
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

test('clicking on "Flight" button triggers navigation to FlightFilters', () => {
  // Create a mock function for navigation
  const mockNavigate = jest.fn();

  // Mock the useNavigation hook to return the mock function
  useNavigation.mockReturnValue({
    navigate: mockNavigate,
  });

  const { getByTestId } = render(
    <NavigationContainer>
      <Header />
    </NavigationContainer>
  );

  // Simulate clicking on the "Flight" button
  const flightButton = getByTestId('flightButton');
  fireEvent.press(flightButton);

  // Assert that the navigate function was called with the expected route name
  expect(mockNavigate).toHaveBeenCalledWith('FlightFilters');
});
