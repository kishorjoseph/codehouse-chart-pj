"use client";

import { useState } from "react";
import styles from "./page.module.css";
import type { Country } from './type';
import { Pagination } from "./components/Pagination";
import {APP_PAGE_TITLE} from './constant'

import {getSortedData, 
	getTopCountries, 
	getBarColors} from './util/appUtil'

export default function HomePage() {
	const [currentYear, setCurrentYear] = useState(0);
	const currentYearData = getSortedData()[currentYear]
	const topCountries: Country[] = getTopCountries(currentYearData)
	const barColors = getBarColors(topCountries)


	return (
		<main className={styles.container}>
			<h1 className={styles.title}>{APP_PAGE_TITLE}</h1>
			<div className={styles.year}>{currentYearData.Year}</div>

			<div className={styles.chartContainer}>
				{topCountries.map((country) => (
					<div key={country._id} className={styles.barRow}>
						<div className={styles.countryName}>{country.Country}</div>
						<div className={styles.barWrapper}>
							<div
								className={styles.bar}
								style={{
									width: `${(country.Population / topCountries[0].Population) * 100}%`,
									backgroundColor: barColors.get(
										country.Country
									),
								}}></div>
						</div>
						<div className={styles.population}>
							{country.Population.toLocaleString()}
						</div>
					</div>
				))}
			</div>
			<Pagination setCurrentYear={setCurrentYear}/>
		</main>
	);
}
