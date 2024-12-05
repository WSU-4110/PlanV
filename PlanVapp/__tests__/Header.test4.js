import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import Header from '../components/Header';

describe('Header Component - handleSelection Flight', () => {
  it('calls handleSelection with the correct argument when "Flight" is pressed', () => {
    const mockHandleSelection = jest.fn();
    const { getByText } = render(
      <NavigationContainer> {/* Wrap Header in NavigationContainer */}
        <Header handleSelection={mockHandleSelection} />
      </NavigationContainer>
    );
    const flightButton = getByText('Flight');
    fireEvent.press(flightButton);
     // Simulate pressing the "Flight" button and check if the handleSelection function is called
    // This test is focused on verifying that the correct function is called with the correct argument when the button is pressed
    expect(mockHandleSelection).toHaveBeenCalledWith('Flight');
  });
});
