interface Country {
	_id: string;
	Country: string;
	Population: number;
}

interface YearlyData {
	Year: number;
	Countries: Country[];
}

export type {
    Country,
    YearlyData
}