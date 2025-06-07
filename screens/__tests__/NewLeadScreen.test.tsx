import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import NewLeadScreen from '../NewLeadScreen';

describe('NewLeadScreen', () => {
    beforeEach(() => {
        render(<NewLeadScreen />);
    });

    it('renders the form with all fields and the save button', () => {
        expect(screen.getByText('Create a New Lead')).toBeTruthy();
        expect(screen.getByTestId('name-input')).toBeTruthy();
        expect(screen.getByTestId('email-input')).toBeTruthy();
        expect(screen.getByTestId('company-input')).toBeTruthy();
        expect(screen.getByTestId('title-input')).toBeTruthy();
        expect(screen.getByTestId('phone-input')).toBeTruthy();
        expect(screen.getByTestId('tags-input')).toBeTruthy();
        expect(screen.getByTestId('notes-input')).toBeTruthy();
        expect(screen.getByTestId('save-button')).toBeTruthy();
    });

    it('shows errors when submitting an empty form', () => {
        fireEvent.press(screen.getByTestId('save-button'));

        expect(screen.getByText('Name is required')).toBeTruthy();
        expect(screen.getByText('Either email or phone number is required')).toBeTruthy();
    });

    it('shows email format error when email is invalid', () => {
        fireEvent.changeText(screen.getByTestId('email-input'), 'invalid-email');
        fireEvent.press(screen.getByTestId('save-button'));

        expect(screen.getByText('Please enter a valid email address')).toBeTruthy();
    });

    it('shows phone format error when phone is invalid', () => {
        fireEvent.changeText(screen.getByTestId('phone-input'), '123');
        fireEvent.press(screen.getByTestId('save-button'));

        expect(screen.getByText('Phone number must be 9 digits')).toBeTruthy();
    });

    it('accepts valid submission with email only', () => {
        fireEvent.changeText(screen.getByTestId('name-input'), 'John Doe');
        fireEvent.changeText(screen.getByTestId('email-input'), 'john@example.com');
        fireEvent.press(screen.getByTestId('save-button'));

        expect(screen.queryByText('Name is required')).toBeNull();
        expect(screen.queryByText('Please enter a valid email address')).toBeNull();
    });

    it('accepts valid submission with phone only', () => {
        fireEvent.changeText(screen.getByTestId('name-input'), 'John Doe');
        fireEvent.changeText(screen.getByTestId('phone-input'), '123456789');
        fireEvent.press(screen.getByTestId('save-button'));

        expect(screen.queryByText('Name is required')).toBeNull();
        expect(screen.queryByText('Phone number must be 9 digits')).toBeNull();
    });

    it('clears "name" error after user starts typing', () => {
        fireEvent.press(screen.getByTestId('save-button'));
        expect(screen.getByText('Name is required')).toBeTruthy();

        fireEvent.changeText(screen.getByTestId('name-input'), 'J');
        expect(screen.queryByText('Name is required')).toBeNull();
    });

    it('strips non-digit characters from phone input', () => {
        const phoneInput = screen.getByTestId('phone-input');
        fireEvent.changeText(phoneInput, '123-456-789');

        expect(phoneInput.props.value).toBe('123456789');
    });
});
