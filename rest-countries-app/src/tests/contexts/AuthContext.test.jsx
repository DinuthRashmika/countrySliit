import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';

const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="user">{user?.username}</span>
      <span data-testid="isAuthenticated">{isAuthenticated.toString()}</span>
      <button onClick={() => login('testuser', 'password')}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides initial context values', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('');
    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
  });

  it('handles login and logout', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByText('Login').click();
    });

    expect(screen.getByTestId('user')).toHaveTextContent('testuser');
    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
    expect(localStorage.getItem('username')).toBe('testuser');
    expect(localStorage.getItem('isLoggedIn')).toBe('true');

    act(() => {
      screen.getByText('Logout').click();
    });

    expect(screen.getByTestId('user')).toHaveTextContent('');
    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
    expect(localStorage.getItem('username')).toBeNull();
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
  });

  it('loads user from localStorage on mount', () => {
    localStorage.setItem('username', 'saveduser');
    localStorage.setItem('isLoggedIn', 'true');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('saveduser');
    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
  });
});