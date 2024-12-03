import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Weather from '../screens/Weather';

global.fetch = jest.fn();


describe('Temperature Toggle Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('Toggles between Celsius and Fahrenheit', async () => {
    const mockWeatherData = {
        name: 'Berlin',
        weather: [{ main: 'Clear', description: 'clear sky' }],
        main: { temp: 10 },
        wind: { speed: 1 },
        sys: { sunrise: 1622524800, sunset: 1622478000 },
        coord: { lat: 40.7128, lon: -74.0060 }
    };

    fetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWeatherData),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ list: [{ main: { aqi: 1 } }] }),
        })
      );

    const { getByPlaceholderText, getByText, findByText } = render(<Weather />);

    fireEvent.changeText(getByPlaceholderText('Enter city'), 'Berlin');
    fireEvent.press(getByText('Search'));

    const celsiusTemp = await findByText('10°C');
    fireEvent.press(celsiusTemp);

    await waitFor(() => {
      expect(getByText('50°F')).toBeTruthy();
    });
  });
});
