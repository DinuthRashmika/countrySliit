import React from 'react';
import { render, screen } from '@testing-library/react';
import Favorites from '../../pages/Favorites';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../hooks/useFavorites';

jest.mock('../../contexts/AuthContext');
jest.mock('../../hooks/useFavorites');

describe('Favorites', () => {
  const mockCountry = {
    name: { common: 'Favorite Country' },
    cca3: 'FAV',
    flags: { png: 'fav-flag.png' },
    capital: ['Favorite Capital'],
    region: 'Favorite Region',
    population: 500000
  };

  beforeEach(() => {
    useAuth.mockReturnValue({ isAuthenticated: true });
  });

  it('shows empty state when no favorites', () => {
    useFavorites.mockReturnValue({
      favorites: [],
      isFavorite: jest.fn(),
      toggleFavorite: jest.fn()
    });

    render(<Favorites />);
    expect(screen.getByText('No favorite countries yet')).toBeInTheDocument();
  });

  it('displays favorite countries', () => {
    useFavorites.mockReturnValue({
      favorites: [mockCountry],
      isFavorite: jest.fn().mockReturnValue(true),
      toggleFavorite: jest.fn()
    });

    render(<Favorites />);
    expect(screen.getByText('Favorite Country')).toBeInTheDocument();
    expect(screen.getByText('Favorite Region')).toBeInTheDocument();
  });
});