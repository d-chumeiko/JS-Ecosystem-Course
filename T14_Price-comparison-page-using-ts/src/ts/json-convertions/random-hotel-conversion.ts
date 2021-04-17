// @ts-ignore
import * as randomHotel from '../../data/random-hotel.json';
import { ECONOMY, STANDARD, LUXURY, PRICES, DEFAULT_STORAGE } from '../constants/constants';
import type { Hotel } from '../types/types';

const convertRandomHotelJson = (data: Array<Hotel>): Array<Hotel> => {
	const dataWithTransformedPrices = tranformNestedPriceObjects(data);
	const mappedData = [];

	dataWithTransformedPrices.forEach((el) => {
		const date = el['date'];
		const economy = el[ECONOMY];
		const standard = el[STANDARD];
		const luxury = el[LUXURY];

		if (economy) {
			mappedData.push({
				type: ECONOMY,
				date,
				price: economy.value,
				currency: economy.currency
			});
		}

		if (standard) {
			mappedData.push({
				type: STANDARD,
				date,
				price: standard.value,
				currency: standard.currency
			});
		}

		if (luxury) {
			mappedData.push({
				type: LUXURY,
				date,
				price: luxury.value,
				currency: luxury.currency
			});
		}
	});

	return mappedData;
};

const tranformNestedPriceObjects = (data: Array<object>): Array<object> =>
	data.map((el) => {
		const economy = el[PRICES][ECONOMY];
		const standard = el[PRICES][STANDARD];
		const luxury = el[PRICES][LUXURY];

		return {
			date: el['date'],
			economy,
			standard,
			luxury
		};
	});

export default convertRandomHotelJson(randomHotel[DEFAULT_STORAGE]);
