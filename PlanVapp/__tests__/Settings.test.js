import React from 'react';
import { Linking } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '../screens/Settings';

jest.mock('react-native/Libraries/Linking/Linking', () => ({
    openURL: jest.fn(),
}));

test('handleContact calls Linking.openURL with the correct email', () => {
    const { getByText } = render(<SettingsScreen navigation={{ navigate: jest.fn() }} />);
    const contactButton = getByText('Contact Us');
    fireEvent.press(contactButton);
    expect(Linking.openURL).toHaveBeenCalledWith('mailto:planvapp@gmail.com');
});


test('navigates to Account screen', () => {
  const mockNavigate = jest.fn();
  const { getByText } = render(<SettingsScreen navigation={{ navigate: mockNavigate }} />);
  const accountButton = getByText('Account and Security');
  fireEvent.press(accountButton);
  expect(mockNavigate).toHaveBeenCalledWith('Account');
});


test('navigates to Appearance screen', () => {
  const mockNavigate = jest.fn();
  const { getByText } = render(<SettingsScreen navigation={{ navigate: mockNavigate }} />);
  const appearanceButton = getByText('Appearance');
  fireEvent.press(appearanceButton);
  expect(mockNavigate).toHaveBeenCalledWith('Appearance');
});

test('navigates to Payment Information screen', () => {
  const mockNavigate = jest.fn();
  const { getByText } = render(<SettingsScreen navigation={{ navigate: mockNavigate }} />);
  const paymentButton = getByText('Payment Information');
  fireEvent.press(paymentButton);
  expect(mockNavigate).toHaveBeenCalledWith('Payment');
});

test('navigates to My Documents screen', () => {
  const mockNavigate = jest.fn();
  const { getByText } = render(<SettingsScreen navigation={{ navigate: mockNavigate }} />);
  const documentsButton = getByText('My Documents');
  fireEvent.press(documentsButton);
  expect(mockNavigate).toHaveBeenCalledWith('Documents');
});

