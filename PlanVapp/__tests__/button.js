import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Weather from '../screens/Weather';

describe('Button fetches data test', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('Fetch Weather upon click.', async () => {
    const mockWeatherData = {
        name: 'Berlin',
        weather: [{ main: 'Rain', description: 'light rain' }],
        main: { temp: 20 },
        wind: { speed: 1 },
        sys: { sunrise: 1622524800, sunset: 1622478000 },
        coord: { lat: 40.7128, lon: -74.0060 }
    };

    const mockAirQualityData = { list: [{ main: { aqi: 1 } }] };

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockWeatherData),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockAirQualityData),
      });

    const { getByPlaceholderText, getByText, findByText } = render(<Weather />);

    fireEvent.changeText(getByPlaceholderText('Enter city'), 'Berlin');
    fireEvent.press(getByText('Search'));

    const cityName = await findByText('Berlin');
    expect(cityName).toBeTruthy();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('api.openweathermap.org/data/2.5/weather?q=Berlin'),
    );
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('api.openweathermap.org/data/2.5/air_pollution'),
    );
    
  });
  test('disables search button when no city is entered', () => {
    const { queryByText } = render(<Weather />);
    const searchButton = queryByText('Search');
    expect(searchButton).toBeNull();
  });
});
