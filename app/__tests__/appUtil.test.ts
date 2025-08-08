import { getSortedData, getTopCountries, getBarColors } from '../util/appUtil';
import type { YearlyData, Country } from '../type';


jest.mock('../../public/data/population.json', () => ([
	{ Year: 2022, Countries: [{ Country: "B", Population: 50 }, { Country: "A", Population: 100 }] },
	{ Year: 2021, Countries: [{ Country: "C", Population: 150 }] },
	{ Year: 2023, Countries: [{ Country: "D", Population: 200 }] },
]), { virtual: true });

describe('appUtil', () => {
	describe('getSortedData', () => {
		it('should return data sorted by year', () => {
			const result = getSortedData();
			const years = result.map(d => d.Year);
			expect(years).toEqual([2021, 2022, 2023]);
		});
	});

	describe('getTopCountries', () => {
		it('should return top countries by population, limited to 15', () => {
			const input: YearlyData = {
				Year: 2025,
				Countries: [
					{ Country: 'X', Population: 10, _id: "1" },
					{ Country: 'Y', Population: 30, _id: "2"  },
					{ Country: 'Z', Population: 20, _id: "3"  },
				]
			};

			const result = getTopCountries(input);
			expect(result.length).toBeLessThanOrEqual(15);
			expect(result.map(c => c.Country)).toEqual(['Y', 'Z', 'X']);
		});
	});

	describe('getBarColors', () => {
		it('should return a map with country names as keys and colors as values', () => {
			const topCountries: Country[] = [
				{ Country: 'A', Population: 100, _id: "1"  },
				{ Country: 'B', Population: 90, _id: "2"  },
				{ Country: 'C', Population: 80, _id: "3"  },
			];

			const result = getBarColors(topCountries);

			expect(result instanceof Map).toBe(true);
			expect(result.size).toBe(3);
			expect(result.get('A')).toBeDefined();
			expect(result.get('B')).toBeDefined();
			expect(result.get('C')).toBeDefined();
		});
	});
});
