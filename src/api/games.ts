import { GameModel } from '../model/game';
import { MockAll } from '../mock/calendar';

const delay = (time: number) => new Promise(res => setTimeout(() => res(), time));

function yearFilter(year: number) {
    return (game: GameModel) => game.beginDate.getFullYear() === year;
}

async function fetchGames(year: number): Promise<Readonly<GameModel[]>> {
    await delay(1000);
    return MockAll.games.filter(yearFilter(year));
}

async function fetchGamesByRegion(year: number, macroregionId: number): Promise<Readonly<GameModel[]>> {
    await delay(1000);
    return MockAll.games.filter(yearFilter(year)).filter(game => game.subregion.parent.id === macroregionId);
}

export const GameAPI = {
    fetchGames,
    fetchGamesByRegion,
};