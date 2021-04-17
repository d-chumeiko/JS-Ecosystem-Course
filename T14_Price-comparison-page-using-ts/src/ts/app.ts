import { Hotel, RenderData } from './types/types';
import cheapBay from './json-convertions/cheap-bay-conversion';
import midrangePalms from './json-convertions/midrange-palms-conversion';
import randomHotel from './json-convertions/random-hotel-conversion';
import renderTable from './view/render-table';
import './view/render-controls';

const hotels: Array<Array<Hotel>> = [randomHotel, midrangePalms, cheapBay];

const table: HTMLDivElement = document.querySelector('#table') as HTMLDivElement;
const datepicker: HTMLInputElement = document.querySelector('#datepicker') as HTMLInputElement;
const selectbox: HTMLSelectElement = document.querySelector('select') as HTMLSelectElement;

datepicker.addEventListener('change', (e) => {
	const trg:HTMLTextAreaElement = e.target as HTMLTextAreaElement;

	const date: string = trg.value;
	const currency: string = selectbox.value;

	const data: RenderData = { hotels, currency, date };

	renderTable(table, data);
});

selectbox.addEventListener('change', (e) => {
	const trg = e.target as HTMLTextAreaElement;

	const currency: string = trg.value;
	const date: string = datepicker.value;

	const data: RenderData = { hotels, currency, date }

	renderTable(table, data);
});

(() => {
	renderTable(table, { hotels, currency: selectbox.value, date: datepicker.value });
})();
