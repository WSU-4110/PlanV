import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Weather from '../screens/Weather';

global.fetch = jest.fn();
describe('Connectivity Test', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('Sends error upon network error.', async () => {
    fetch.mockImplementationOnce(() => 
      Promise.reject(new Error('Network error'))
    );

    const { getByPlaceholderText, getByText, findByText } = render(<Weather />);
    
    fireEvent.changeText(getByPlaceholderText('Enter city'), 'Berlin');
    fireEvent.press(getByText('Search'));

    const errorMessage = await findByText('Contact us for this error. Could not fetch weather.');
    expect(errorMessage).toBeTruthy();
  });
});
