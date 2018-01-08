import { CalendarModel, GameModel } from '../model/game';
import { GameRow } from './GameRow';
import * as React from 'react';

export interface CalendarProps {
    calendar: CalendarModel;
}

export function Calendar(props: CalendarProps) {
    return (
        <div>
            {props.calendar.map( (g: GameModel) =>
                <GameRow {...g} key={g.id}/> 
            )}
        </div>
    );
}