import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomePage';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: jest.fn(() => ({
      navigate: mockNavigate,
      goBack: jest.fn(),
    })),
  };
});

jest.mock('../constants/icons', () => ({
  airplane: require('../assets/icons/airplane_icon.png'),
  map: require('../assets/icons/map_icon.png'),
  cloud: require('../assets/icons/cloud_icon.png'),
  user: require('../assets/icons/user_icon.png'),
  bag: require('../assets/icons/bag-shopping-icon.png'),
  house: require('../assets/icons/house_icon.png'),
  notification: require('../assets/icons/notification.png'),
  MG: require('../assets/icons/magnifying_icon.png'),
  star: require('../assets/icons/star.png'),
}));

jest.mock('../constants/places', () => [
  { name: 'Paris', location: 'France', image: require('../assets/Paris2.jpg') },
  { name: 'Tokyo', location: 'Japan', image: require('../assets/Japan2.jpg') },
  { name: 'Rome', location: 'Italy', image: require('../assets/Italy2.png') },
]);

beforeEach(() => {
  jest.clearAllMocks(); // Reset mocks before each test
});

describe('HomeScreen', () => {
  it('renders correctly', () => {
    render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    expect(screen.getByText('Explore the')).toBeTruthy();
    expect(screen.getByText('beautiful places')).toBeTruthy();
    expect(screen.getByPlaceholderText('Search Paris, Tokyo, or Pisa for different result')).toBeTruthy();
  });



  it('filters places based on search query', async () => {
    render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    const searchInput = screen.getByPlaceholderText('Search Paris, Tokyo, or Pisa for different result');
    fireEvent.changeText(searchInput, 'Paris');

    await waitFor(() => {
      expect(screen.getByText('Paris')).toBeTruthy();
      expect(screen.queryByText('Tokyo')).toBeNull();
    });
  });

  it('scrolls to the matched item when a search query is entered', async () => {
    render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    const searchInput = screen.getByPlaceholderText('Search Paris, Tokyo, or Pisa for different result');
    fireEvent.changeText(searchInput, 'Paris');

    const searchButton = screen.getByText('Search');
    fireEvent.press(searchButton);

    // Expect no navigation in this case
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });

  it('should add a new destination to itinerary', () => {
    render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    const destinationInput = screen.getByPlaceholderText('Enter destination');
    const dateInput = screen.getByPlaceholderText('Enter date (YYYY-MM-DD)');
    const addButton = screen.getByText('Add');

    fireEvent.changeText(destinationInput, 'Berlin');
    fireEvent.changeText(dateInput, '2024-08-10');
    fireEvent.press(addButton);

    expect(screen.getByText('Berlin - 2024-08-10')).toBeTruthy();
  });

});
