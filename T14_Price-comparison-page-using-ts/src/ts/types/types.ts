import { ECONOMY, STANDARD, LUXURY, EUR, UAH, USD } from '../constants/constants';

export type Currency = typeof EUR | typeof UAH | typeof USD;

export type CurrencyPrices = {
  'EUR': number,
  'UAH': number,
  'USD': number
}

export type CurrencyMap = {
  'EUR': CurrencyPrices,
  'UAH': CurrencyPrices,
  'USD': CurrencyPrices
}

export type HotelTypes = typeof ECONOMY | typeof STANDARD | typeof LUXURY;

export type Hotel = {
  type: HotelTypes,
  date: string,
  price: number,
  currency: Currency
}

export type RenderData = {
  hotels: Array<Array<Hotel>>
  date: string,
  currency: Currency
}

export interface CurrencyConverter {
  convert(value: number, from: Currency, to: Currency): number;
  toEUR(value: number, currency: Currency): number;
  toUAH(value: number, currency: Currency): number;
  toUSD(value: number, currency: Currency): number;
}