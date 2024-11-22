import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Weather from '../../screens/Weather';

describe('Air Quality Tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  const fakeweather = {
    ok: true,
    json: () => Promise.resolve({
      name: 'Berlin',
      weather: [{ main: 'Clear', description: 'clear sky' }],
      main: { temp: 20 },
      wind: { speed: 1 },
      sys: { sunrise: 1622524800, sunset: 1622478000 },
      coord: { lat: 40.7128, lon: -74.0060 }
    })
  };

  const fakeair = [
    { aqi: 1, expected: 'Good' },
  ];

  test.each(fakeair)('correctly maps air quality index $aqi to $expected', async ({ aqi, expected }) => {
    global.fetch
      .mockImplementationOnce(() => Promise.resolve(fakeweather))
      .mockImplementationOnce(() => Promise.resolve({
          json: () => Promise.resolve({ list: [{ main: { aqi } }] })
        })
      );

    const { getByPlaceholderText, getByText, findByText } = render(<Weather />);
    fireEvent.changeText(getByPlaceholderText('Enter city'), 'Berlin');
    fireEvent.press(getByText('Search'));
    const airQualityElement = await findByText(`Air Quality: ${expected}`);
    expect(airQualityElement).toBeTruthy();

  });
});