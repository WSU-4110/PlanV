import React from 'react';
import { render } from '@testing-library/react-native';
import FlightFilters from '../Screens/Booking/FlightFilters';

describe('FlightFilters Component', () => {
  test('displays error message when no flight data is available', () => {
    const route = { params: { flightData: [] } };
    const { getByText } = render(<FlightFilters route={route} />);

    expect(getByText('No flight data available.')).toBeTruthy();
  });
});
