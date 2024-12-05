import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Header from '../components/Header';

describe('Header Component - Render', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Header handleSelection={jest.fn()} />
      </NavigationContainer>
    );
    expect(getByText('Flight')).toBeTruthy();
    expect(getByText('Hotel')).toBeTruthy();
  });
});
