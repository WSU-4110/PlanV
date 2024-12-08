import React from 'react';
import { render } from '@testing-library/react-native';
import DetailsScreen from '../screens/DetailsScreen';

describe('DetailsScreen', () => {
  // Mock route params for the test
  const mockRoute = {
    params: {
      place: {
        name: 'Paris',
        date: '2024-12-07',
      },
    },
  };

  test('should render the place name correctly', () => {
    const { getByText } = render(<DetailsScreen route={mockRoute} />);
    expect(getByText('Paris')).toBeTruthy(); // Check if the place name is rendered
  });

  test('should render the place date correctly', () => {
    const { getByText } = render(<DetailsScreen route={mockRoute} />);
    expect(getByText('Date: 2024-12-07')).toBeTruthy(); // Check if the date is rendered
  });

  test('should render the description text', () => {
    const { getByText } = render(<DetailsScreen route={mockRoute} />);
    expect(getByText('Explore the beauty of Paris. This destination is known for its rich history, stunning architecture, and vibrant culture. Plan your trip and make the most of your adventure!')).toBeTruthy();
  });

  test('should render the Book Now button', () => {
    const { getByText } = render(<DetailsScreen route={mockRoute} />);
    expect(getByText('Book Now')).toBeTruthy(); // Ensure the Book Now button is rendered
  });
});
