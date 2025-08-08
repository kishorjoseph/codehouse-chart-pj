import React, {Dispatch, SetStateAction, useState} from "react"
import styles from "../page.module.css";
import {getSortedData} from '../util/appUtil'

type PaginationProps = {
    setCurrentYear: Dispatch<SetStateAction<number>>
}

export const Pagination:React.FC <PaginationProps> = ({setCurrentYear}) => {

    const [currentYearIndex, setCurrentYearIndex] = useState(0);
    const sortedData = getSortedData();

    const nextYear = () => {
		setCurrentYearIndex((i) => Math.min(i + 1, sortedData.length - 1));
        setCurrentYear((i) => Math.min(i + 1, sortedData.length - 1));
	};

    const prevYear = () => {
		setCurrentYearIndex((i) => Math.max(i - 1, 0));
        setCurrentYear((i) => Math.max(i - 1, 0));   
	};

    return(
        <>
        <div className={styles.navigation}>
				<button
					onClick={prevYear}
					disabled={currentYearIndex === 0}
					className={styles.navButton}>
					Prev
				</button>
				<button
					onClick={nextYear}
					disabled={currentYearIndex === sortedData.length - 1}
					className={styles.navButton}>
					Next
				</button>
			</div>
        </>
    )
}