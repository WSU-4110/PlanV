import React from 'react';
import { render } from '@testing-library/react-native';
import HotelFilters from '../Screens/Booking/HotelFilters';

describe('HotelFilters Component', () => {
  test('displays "No hotels found" when no hotels are available', () => {
    const route = { params: { hotels: [] } };
    const { getByText } = render(<HotelFilters route={route} />);

    expect(getByText('No hotels found')).toBeTruthy();
  });
});
