import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CountryDetails from '../../pages/CountryDetails';
import { server } from '../setupTests';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../hooks/useFavorites';

jest.mock('../../contexts/AuthContext');
jest.mock('../../hooks/useFavorites');

describe('CountryDetails', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ isAuthenticated: true });
    useFavorites.mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(false),
      toggleFavorite: jest.fn()
    });
  });

  it('renders country details', async () => {
    render(
      <MemoryRouter initialEntries={['/country/TST']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
      expect(screen.getByText('Test Country Official')).toBeInTheDocument();
      expect(screen.getByText('Test Region')).toBeInTheDocument();
      expect(screen.getByText('Test Capital')).toBeInTheDocument();
      expect(screen.getByText('1,000,000')).toBeInTheDocument();
    });
  });

  it('shows error when country not found', async () => {
    server.use(
      rest.get('https://restcountries.com/v3.1/alpha/TST', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    render(
      <MemoryRouter initialEntries={['/country/TST']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Country not found')).toBeInTheDocument();
    });
  });
});