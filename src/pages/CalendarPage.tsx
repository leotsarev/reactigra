import * as React from 'react';
import { Calendar } from '../components/Calendar';
import { GameModel } from '../model/game';
import { GameAPI } from '../api/games';

interface AppProps {
    macroregion?: number;
    year: number;
}

interface CalendarState {
    games: Readonly<GameModel[]>;
}

export class CalendarPage extends React.Component<AppProps, CalendarState> {
    state = {
        games: []
    };

    public async componentDidMount() {
        const games = this.props.macroregion === undefined 
            ? await GameAPI.fetchGames(this.props.year) 
            : await GameAPI.fetchGamesByRegion(this.props.year, this.props.macroregion);
        this.setState({
            games: games
        });
        
    }

    render() {
        return <Calendar calendar={this.state.games}/>;
    }
}