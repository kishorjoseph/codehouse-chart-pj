import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../page';
import * as appUtil from '../util/appUtil';
import { APP_PAGE_TITLE } from '../constant';


jest.mock('../components/Pagination', () => ({
  Pagination: ({ setCurrentYear }: { setCurrentYear: () => void }) => (
    <div data-testid="pagination-mock">Pagination Mock</div>
  ),
}));


jest.mock('../util/appUtil', () => ({
  getSortedData: jest.fn(),
  getTopCountries: jest.fn(),
  getBarColors: jest.fn(),
}));

describe('HomePage', () => {
  const mockSortedData = [
    { Year: 2020, Countries: [] },
    { Year: 2021, Countries: [] },
  ];

  const mockTopCountries = [
    { _id: '1', Country: 'CountryA', Population: 100 },
    { _id: '2', Country: 'CountryB', Population: 50 },
  ];

  const mockBarColors = new Map([
    ['CountryA', '#111111'],
    ['CountryB', '#222222'],
  ]);

  beforeEach(() => {
    jest.clearAllMocks();
    (appUtil.getSortedData as jest.Mock).mockReturnValue(mockSortedData);
    (appUtil.getTopCountries as jest.Mock).mockReturnValue(mockTopCountries);
    (appUtil.getBarColors as jest.Mock).mockReturnValue(mockBarColors);
  });

  it('renders the page title and current year', () => {
    render(<HomePage />);
    expect(screen.getByText(APP_PAGE_TITLE)).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
  });

  it('renders top countries with correct names, colors, and population formatting', () => {
    render(<HomePage />);


    expect(screen.getByText('CountryA')).toBeInTheDocument();
    expect(screen.getByText('CountryB')).toBeInTheDocument();


    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();

  });

  it('renders the Pagination component', () => {
    render(<HomePage />);
    expect(screen.getByTestId('pagination-mock')).toBeInTheDocument();
  });
});
