import * as React from 'react';
import { MacroRegionModel } from '../model/game';
import { Link } from 'react-router-dom';

interface CalendarLinkProps {
    year?: number;
    region?: MacroRegionModel;
    children: React.ReactNode;
}

export function CalendarLink(props: CalendarLinkProps) {
    let linkParts: string[] = [];
    const {year, region} = props;
    if (region) {
        linkParts.push(region.urlPart);
    }
    if (year) {
        linkParts.push(year.toString());
    }
    const link = '/' + linkParts.join('/');
    return (
        <Link to={link}> {props.children} </Link> 
    );
}