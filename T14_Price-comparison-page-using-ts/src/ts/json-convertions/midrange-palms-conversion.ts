// @ts-ignore
import * as midrangePalms from '../../data/midrange-palms.json';
import { ECONOMY, STANDARD, LUXURY, DEFAULT_STORAGE } from '../constants/constants';
import type {Hotel} from '../types/types';

const convertMidrangePalmsJson = (data: object): Array<Hotel> => {
	const economyResults = data[ECONOMY];
	const standardResults = data[STANDARD];
	const luxuryResults = data[LUXURY];

	economyResults.map((el) => (el.type = ECONOMY));
	standardResults.map((el) => (el.type = STANDARD));
	luxuryResults.map((el) => (el.type = LUXURY));

	return [ ...economyResults, ...standardResults, ...luxuryResults ];
};

export default convertMidrangePalmsJson(midrangePalms[DEFAULT_STORAGE]);
