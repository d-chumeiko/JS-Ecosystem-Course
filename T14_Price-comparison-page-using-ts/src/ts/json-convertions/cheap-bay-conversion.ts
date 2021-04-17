// @ts-ignore
import * as cheapBay from '../../data/cheap-bay.json';
import {
	CHEAP_BAY_NEEDED_YEAR_INDEX,
	CHEAP_BAY_NEEDED_MONTH_INDEX,
	CHEAP_BAY_NEEDED_DAY_INDEX,
	CHEAP_BAY_CURRENT_YEAR_INDEX,
	CHEAP_BAY_CURRENT_MONTH_INDEX,
	CHEAP_BAY_CURRENT_DAY_INDEX,
	CHEAP_BAY_CURRENCY_INDEX,
	ECONOMY,
	STANDARD,
	DEFAULT_STORAGE,

} from '../constants/constants';
import type { Hotel } from '../types/types';

const formatDateForCheapBay = (d: string): string => {
	const date = d.split('/');

	const currentYear = date[CHEAP_BAY_CURRENT_YEAR_INDEX];
	const currentMonth = date[CHEAP_BAY_CURRENT_MONTH_INDEX];
	const currentDay = date[CHEAP_BAY_CURRENT_DAY_INDEX];

	date[CHEAP_BAY_NEEDED_YEAR_INDEX] = currentYear;
	date[CHEAP_BAY_NEEDED_MONTH_INDEX] = currentMonth;
	date[CHEAP_BAY_NEEDED_DAY_INDEX] = currentDay;

	return date.join('-');
};

const formatCurrencyForCheapBay = (p: string): string => p.split(' ')[CHEAP_BAY_CURRENCY_INDEX];

const convertCheapBayJson = (data: object): Array<Hotel> => {
	const result = [];

	for (let el in data) {
		const date = formatDateForCheapBay(el);
		const economyPrice = parseFloat(data[el][ECONOMY]);
		const standardPrice = parseFloat(data[el][STANDARD]);
		const economyCurrency = formatCurrencyForCheapBay(data[el][ECONOMY]);
		const standardCurrency = formatCurrencyForCheapBay(data[el][STANDARD]);

		if (data[el][ECONOMY]) {
			result.push({
				type: ECONOMY,
				date,
				price: economyPrice,
				currency: economyCurrency
			});
		}

		if (data[el][STANDARD]) {
			result.push({
				type: STANDARD,
				date,
				price: standardPrice,
				currency: standardCurrency
			});
		}
	}

	return result;
};

export default convertCheapBayJson(cheapBay[DEFAULT_STORAGE]);
