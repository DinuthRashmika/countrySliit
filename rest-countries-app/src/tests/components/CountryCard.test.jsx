import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryCard from '../../components/CountryCard';
import { useAuth } from '../../contexts/AuthContext';

jest.mock('../../contexts/AuthContext');

describe('CountryCard', () => {
  const mockCountry = {
    name: { common: 'Test Country' },
    cca3: 'TST',
    flags: { png: 'test-flag.png', alt: 'Test Flag' },
    capital: ['Test Capital'],
    region: 'Test Region',
    population: 1000000
  };

  const mockToggleFavorite = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({ isAuthenticated: true });
  });

  it('renders country information', () => {
    render(
      <CountryCard 
        country={mockCountry} 
        isFavorite={false} 
        onToggleFavorite={mockToggleFavorite} 
      />
    );
    
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('Test Region')).toBeInTheDocument();
    expect(screen.getByText('Test Capital')).toBeInTheDocument();
    expect(screen.getByText('1,000,000')).toBeInTheDocument();
  });

  it('calls toggleFavorite when favorite button is clicked', () => {
    render(
      <CountryCard 
        country={mockCountry} 
        isFavorite={false} 
        onToggleFavorite={mockToggleFavorite} 
      />
    );
    
    fireEvent.click(screen.getByLabelText('Add to favorites'));
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockCountry);
  });

  it('shows filled heart when country is favorite', () => {
    render(
      <CountryCard 
        country={mockCountry} 
        isFavorite={true} 
        onToggleFavorite={mockToggleFavorite} 
      />
    );
    
    expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
  });
});