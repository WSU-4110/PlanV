import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Header from '../components/Header';

describe('Header Component - Default Filter', () => {
  it('has default selected filter as "Flight"', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Header handleSelection={jest.fn()} />
      </NavigationContainer>
    );

    const flightButton = getByText('Flight');

    // Check for the specific 'color' property
    expect(flightButton.props.style.color).toBe('white');
  });
});
