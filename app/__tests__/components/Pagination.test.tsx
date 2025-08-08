import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../../components/Pagination';
import * as appUtil from '../../util/appUtil'
import '@testing-library/jest-dom';

jest.mock('../../util/appUtil', () => ({
	getSortedData: jest.fn(),
}));

describe('Pagination Component', () => {
	const mockSetCurrentYear = jest.fn();

	const mockSortedData = [2020, 2021, 2022, 2023];
	beforeEach(() => {
		jest.clearAllMocks();
		(appUtil.getSortedData as jest.Mock).mockReturnValue(mockSortedData);
	});

	it('renders Prev and Next buttons', () => {
		render(<Pagination setCurrentYear={mockSetCurrentYear} />);
		expect(screen.getByText('Prev')).toBeInTheDocument();
		expect(screen.getByText('Next')).toBeInTheDocument();
	});

	it('disables Prev button initially and enables Next', () => {
		render(<Pagination setCurrentYear={mockSetCurrentYear} />);
		expect(screen.getByText('Prev')).toBeDisabled();
		expect(screen.getByText('Next')).toBeEnabled();
	});

	it('clicking Next calls setCurrentYear and updates state', () => {
		render(<Pagination setCurrentYear={mockSetCurrentYear} />);
		
		const nextButton = screen.getByText('Next');
		fireEvent.click(nextButton);

		expect(mockSetCurrentYear).toHaveBeenCalledWith(expect.any(Function));
		expect(screen.getByText('Prev')).toBeEnabled();
	});

	it('disables Next button when at last index', () => {
		render(<Pagination setCurrentYear={mockSetCurrentYear} />);
		const nextButton = screen.getByText('Next');

		for (let i = 0; i < mockSortedData.length - 1; i++) {
			fireEvent.click(nextButton);
		}

		expect(nextButton).toBeDisabled();
	});

	it('clicking Prev after moving forward works correctly', () => {
		render(<Pagination setCurrentYear={mockSetCurrentYear} />);
		const nextButton = screen.getByText('Next');
		const prevButton = screen.getByText('Prev');

		fireEvent.click(nextButton);
		expect(prevButton).toBeEnabled();

		fireEvent.click(prevButton);
		expect(prevButton).toBeDisabled();
	});
});
