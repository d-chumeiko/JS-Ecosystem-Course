import type { CurrencyMap, CurrencyConverter, Currency } from './types/types';
import { EUR, UAH, USD } from './constants/constants';

export class Converter implements CurrencyConverter {
	private cmap: CurrencyMap;
	private usdToUah: number;
	private eurToUah: number;

	constructor(usdToUah: number, eurToUah: number) {
		this.usdToUah = usdToUah;
		this.eurToUah = eurToUah;
		this.cmap = this.createCurrancyMap(this.usdToUah, this.eurToUah);
	}

	convert(value: number, from: Currency, to: Currency): number {
		return this.cmap[from][to].toFixed(2) * value;
	};

	toEUR(value: number, currency: Currency): number {
		return this.cmap[currency][EUR] * value;
	};
	toUAH(value: number, currency: Currency): number {
		return this.cmap[currency][UAH] * value;
	};
	toUSD(value: number, currency: Currency): number {
		return this.cmap[currency][USD] * value;
	};

	private createCurrancyMap(usdToUah: number, eurToUah: number): CurrencyMap {
		const eurToUsd: number = eurToUah / usdToUah;
		const uahToUsd: number = 1 / usdToUah;

		const usdToEur: number = usdToUah / eurToUah;
		const uahToEur: number = 1 / eurToUah;

		return {
			EUR: { EUR: 1, UAH: eurToUah, USD: usdToEur },
			UAH: { EUR: uahToEur, UAH: 1, USD: uahToUsd },
			USD: { EUR: eurToUsd, UAH: usdToUah, USD: 1 }
		}
	};
}
