import * as React from 'react';

interface GameDateProps {
    begin: Date;
    duration: number;
}

function addDays(date: Date, days: number): Date {
    let end = date;
    end.setDate(date.getDate() + days);
    return end;
}

export function GameDate(props: GameDateProps) {
    const begin = props.begin;
    const end = addDays(begin, props.duration);
    return (
        <span>
            {begin.toDateString()} - {end.toDateString()}
        </span>
    );
}