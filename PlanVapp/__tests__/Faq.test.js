import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FAQ from '../screens/FAQ'; // Adjust the import path if needed

// Mocking the navigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('FAQ Component', () => {
  
  test('renders the FAQ list correctly', () => {
    const { getByText } = render(<FAQ />);

    // Check if the FAQ title is displayed
    expect(getByText('Frequently Asked Questions')).toBeTruthy();

    // Check if the questions are rendered
    expect(getByText('How do we contact you?')).toBeTruthy();
    expect(getByText('What is the refund policy?')).toBeTruthy();
    expect(getByText('How do I change my payment method?')).toBeTruthy();
    expect(getByText('Is the app available in multiple languages?')).toBeTruthy();
    expect(getByText('Can I cancel my booking?')).toBeTruthy();
    expect(getByText('Is there a dark mode option?')).toBeTruthy();
  });

  test('toggles the answer visibility when a question is clicked', () => {
    const { getByText, queryByText } = render(<FAQ />);

    // Check that the answer is not visible initially
    expect(queryByText('Use the contact us page.')).toBeNull();

    // Simulate a click on the first question
    fireEvent.press(getByText('How do we contact you?'));

    // Check if the answer appears after clicking
    expect(getByText('Use the contact us page.')).toBeTruthy();

    // Simulate a click to hide the answer
    fireEvent.press(getByText('How do we contact you?'));

    // Check if the answer is hidden after clicking again
    expect(queryByText('Use the contact us page.')).toBeNull();
  });


});

