import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from '../components/Alert';

describe('Alert Component', () => {
    // Test 1: Renders without crashing
    test('renders without crashing', () => {
        render(<Alert message="Test message" />);
        expect(screen.getByTestId('alert')).toBeInTheDocument();
    });

    // Test 2: Displays correct message
    test('displays the correct message', () => {
        const testMessage = 'Hello World';
        render(<Alert message={testMessage} />);
        expect(screen.getByText(testMessage)).toBeInTheDocument();
    });

    // Test 3: Default type is "info"
    test('has default type "info"', () => {
        render(<Alert message="Test" />);
        expect(screen.getByTestId('alert')).toHaveClass('alert-info');
    });

    // Test 4: Applies correct type class
    test('applies correct type class', () => {
        render(<Alert message="Test" type="success" />);
        expect(screen.getByTestId('alert')).toHaveClass('alert-success');
    });

    // Test 5: Shows icon by default
    test('shows icon by default', () => {
        render(<Alert message="Test" />);
        expect(screen.getByText('ℹ️')).toBeInTheDocument();
    });

    // Test 6: Hides icon when showIcon is false
    test('hides icon when showIcon is false', () => {
        render(<Alert message="Test" showIcon={false} />);
        expect(screen.queryByText('ℹ️')).not.toBeInTheDocument();
    });
});