import React from 'react';
import { render } from '@testing-library/react-native';
import ContactUs from '../screens/Contact'; // Adjust the import path if needed

describe('ContactUs Component', () => {

  test('renders correctly', () => {
    const { getByText } = render(<ContactUs />);
    
    // Check for the presence of some text on the screen
    expect(getByText('Get in Touch! 📱')).toBeTruthy();
    expect(getByText('We\'d love to hear from you')).toBeTruthy();
    expect(getByText('Send Message ✈️')).toBeTruthy();

  });

  test('renders the contact form correctly', () => {
    const { getByPlaceholderText } = render(<ContactUs />);

    // Check if placeholders for the input fields are displayed
    expect(getByPlaceholderText('Your Name')).toBeTruthy();
    expect(getByPlaceholderText('Your email address')).toBeTruthy();
    expect(getByPlaceholderText('What can we help you with?')).toBeTruthy();
  });
});
