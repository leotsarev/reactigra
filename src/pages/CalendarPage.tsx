import * as React from 'react';
import { MockAll } from '../mock/calendar';
import { Calendar } from '../components/Calendar';

interface AppProps {
    macroregion?: number;
    year?: number;
}

function loadGames(macroregion?: number) {
    if (macroregion != null) {
        return MockAll.games.filter(game => game.subregion.parent.id === macroregion);
    } else {
        return MockAll.games;
    }
}
export function CalendarPage(props: AppProps) {
    const games = loadGames(props.macroregion);
    return <Calendar calendar={games}/>;
}