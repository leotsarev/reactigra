import { GameModel } from '../model/game';
import { MockAll } from '../mock/calendar';
import * as warning from 'warning';

// const delay = (time: number) => new Promise(res => setTimeout(() => res(), time));

function yearFilter(year: number) {
    return (game: GameModel) => game.beginDate.getFullYear() === year;
}

async function fetchGames(year: number): Promise<Readonly<GameModel[]>> {
    // await delay(1000);
    return MockAll.games.filter(yearFilter(year)).slice();
}

async function fetchGamesByRegion(year: number, macroregionId: number): Promise<Readonly<GameModel[]>> {
    // await delay(1000);
    warning(typeof(year) === typeof(2018), 'year should be number ' + typeof(year));
    const games = MockAll.games
      //  .filter(yearFilter(year))
        .filter(game => game.beginDate.getFullYear() == year && game.subregion.parent.id === macroregionId)
        .slice();
    warning(games.length !== 0, `Should be games for year: ${year} and region: ${macroregionId}`);
    return games;
}

export const GameAPI = {
    fetchGames,
    fetchGamesByRegion,
};