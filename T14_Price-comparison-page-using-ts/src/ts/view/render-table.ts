import { RenderData, CurrencyConverter, Hotel } from './../types/types';
import { Converter } from '../converter';
import {
	ECONOMY,
	STANDARD,
	LUXURY,
	RANDOM_HOTEL_NAME,
	CHEAP_BAY_NAME,
	MIN_RANGE_PALMS_NAME,
	USD_TO_UAH,
	EUR_TO_UAH
} from '../constants/constants';

const converter: CurrencyConverter = new Converter(USD_TO_UAH, EUR_TO_UAH);

const capitalizeFirstLetter = (str: string): string => str[0].toUpperCase() + str.slice(1);

const findHotelByDateAndType = (hotel: Array<Hotel>, date: string, type: string): Hotel =>
	hotel.find((el) => el.date === date && el.type === type);

const convertPriceToNeededCurrency = (value: number, from: string, to: string): string => {
	const price = converter.convert(value, from, to);

	return `<td>${price.toFixed(2)} ${to}</td>`;
};

const createTBodyRows = ({ hotels, currency, date }: RenderData): string =>
	[ ECONOMY, STANDARD, LUXURY ]
		.map(
			(t) =>
				`<tr> 
        <td>${capitalizeFirstLetter(t)}</td> 
        ${hotels
			.map((h) => {
				const hotel = findHotelByDateAndType(h, date, t);
				return hotel ? convertPriceToNeededCurrency(hotel.price, hotel.currency, currency) : '<td>N/A</td>';
			})
			.join('')}
      </tr>`
		)
		.join('');

const createTHeadRows = (): string =>
	[ '', RANDOM_HOTEL_NAME, MIN_RANGE_PALMS_NAME, CHEAP_BAY_NAME ]
		.map((name, i) => `<th>${i === 0 ? '' : name}</th>`)
		.join('');

const renderTable = (container: HTMLElement, data: RenderData): void => {
	const table: string = `
    <table>
      <thead>
        ${createTHeadRows()}
      </thead>
      <tbody>
        ${createTBodyRows(data)}
      </tbody>
    </table>
  `;

	container.innerHTML = '';
	container.insertAdjacentHTML('beforeend', table);
};

export default renderTable;
