// src/util/appUtil.ts
import jsonData from "../../public/data/population.json";
import type { YearlyData, Country } from '../type';

const getSortedData = (): YearlyData[] => {
	return [...jsonData].sort((a, b) => a.Year - b.Year);
};

const getTopCountries = (currentYearData: YearlyData): Country[] => {
	return [...currentYearData.Countries]
		.sort((a, b) => b.Population - a.Population)
		.slice(0, 15);
};

const getBarColors = (topCountries: Country[]): Map<string, string> => {
	const colors = [
		"#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f",
		"#edc948", "#b07aa1", "#ff9da7", "#9c755f", "#bab0ab",
		"#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b",
	];
	return new Map(topCountries.map((c, i) => [c.Country, colors[i % colors.length]]));
};

export { getSortedData, getTopCountries, getBarColors };
