import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '../../pages/Home';
import { server } from '../setupTests';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../hooks/useFavorites';

jest.mock('../../contexts/AuthContext');
jest.mock('../../hooks/useFavorites');

describe('Home', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ isAuthenticated: true });
    useFavorites.mockReturnValue({
      favorites: [],
      isFavorite: jest.fn(),
      toggleFavorite: jest.fn()
    });
  });

  it('renders loading state initially', async () => {
    render(<Home />);
    expect(screen.getByText('Loading countries...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading countries...')).not.toBeInTheDocument();
    });
  });

  it('renders countries after loading', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
    });
  });

  it('filters countries by search term', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });

    await waitFor(() => {
      expect(screen.getByText('No countries match your search criteria.')).toBeInTheDocument();
    });
  });

  it('shows error message when API fails', async () => {
    server.use(
      rest.get('https://restcountries.com/v3.1/all', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch countries/)).toBeInTheDocument();
    });
  });
});