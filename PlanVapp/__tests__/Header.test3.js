import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import Header from '../components/Header';

describe('Header Component - Filter Change', () => {
  it('changes selected filter when "Hotel" is pressed', () => {
    const { getByText } = render(
      <NavigationContainer> {/* Wrap Header with NavigationContainer */}
        <Header handleSelection={jest.fn()} />
      </NavigationContainer>
    );
    
    const hotelButton = getByText('Hotel').parent;
    fireEvent.press(hotelButton);

    // Check if the button's style contains color: 'white'
    expect(hotelButton.props.style).toMatchObject({ color: 'white' });
  });
});
