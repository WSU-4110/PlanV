import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Weather from '../screens/Weather';

describe('Time Update Tests', () => {
  beforeEach(() => {
    const mockWeatherData = {
      name: 'Berlin',
      weather: [{ main: 'Clear', description: 'clear sky' }],
      main: { temp: 20, feels_like: 19, humidity: 65 },
      wind: { speed: 2 },
      sys: { sunrise: 1622524800, sunset: 1622478000 },
      coord: { lat: 51.5074, lon: -0.1278 }
    };

    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockWeatherData)
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ list: [{ main: { aqi: 1 } }] })
      }));
    
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T12:00:00'));
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('Time updates in real-time.', async () => {
    const { getByPlaceholderText, getByText } = render(<Weather />);
    
    const input = getByPlaceholderText('Enter city');
    fireEvent.changeText(input, 'Berlin');
    fireEvent.press(getByText('Search'));
  
    await act(async () => {
      jest.runOnlyPendingTimers();
    });
  
    const initialTimeElement = getByText(/Current Time: 12:00:01 PM/);
    expect(initialTimeElement).toBeTruthy();
  });
});
