// @flow

export type League = 'AMA' | 'SEMI' | 'PRO';

export type Player = {
	id: string,
	fullName: string,
	league: League
};

export type PlayersScore = {
	score: number,
	prevScore: number,
	isWinner?: boolean
}

export type MappedPlayer = Player & PlayersScore;

export type Leaders = {
	totalLeader: string,
	pro: string,
	semi: string,
	amateur: string,
};