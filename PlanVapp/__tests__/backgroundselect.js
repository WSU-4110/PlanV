import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Weather from '../screens/Weather';

global.fetch = jest.fn();

jest.mock('../../assets/rainy.jpg', () => 'mocked-rainy-image');
jest.mock('react-native/Libraries/Image/ImageBackground', () => 'ImageBackground');

describe('Background Image Selection Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('Tests if it gets a background based on the condition.', async () => {
    const mockWeatherData = {
      name: 'Berlin',
      weather: [{ main: 'Rain', description: 'light rain' }],
      main: { temp: 20 },
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

    const { getByPlaceholderText, getByText, findByTestId } = render(<Weather />);
    fireEvent.changeText(getByPlaceholderText('Enter city'), 'Berlin');
    fireEvent.press(getByText('Search'));
    const backgroundImage = await findByTestId('background-image');
    expect(backgroundImage.props.source).toEqual( 
        "mocked-rainy-image"
    );
  });
});
