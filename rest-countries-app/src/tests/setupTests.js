import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import '@testing-library/jest-dom';

// Mock API responses
const handlers = [
  rest.get('https://restcountries.com/v3.1/all', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: { common: 'Test Country', official: 'Test Country Official' },
          cca3: 'TST',
          flags: { png: 'test-flag.png', svg: 'test-flag.svg' },
          capital: ['Test Capital'],
          region: 'Test Region',
          population: 1000000,
          languages: { eng: 'English' },
          currencies: { USD: { name: 'US Dollar', symbol: '$' } },
          timezones: ['UTC+0']
        }
      ])
    );
  }),
  rest.get('https://restcountries.com/v3.1/alpha/TST', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: { common: 'Test Country', official: 'Test Country Official' },
          cca3: 'TST',
          flags: { png: 'test-flag.png', svg: 'test-flag.svg' },
          capital: ['Test Capital'],
          region: 'Test Region',
          subregion: 'Test Subregion',
          population: 1000000,
          languages: { eng: 'English' },
          currencies: { USD: { name: 'US Dollar', symbol: '$' } },
          timezones: ['UTC+0'],
          borders: []
        }
      ])
    );
  })
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());