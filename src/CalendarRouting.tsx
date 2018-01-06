import * as React from 'react';
import { MacroRegionModel } from './model/game';
import { CalendarPage } from './pages/CalendarPage';
import { Route, Switch as RouteSwitch, Redirect } from 'react-router-dom';

interface Props {
    regions: Readonly<MacroRegionModel[]>;
    year: number;
}

function calendarRoute(region: MacroRegionModel, year: number) {
    const routePart = region.urlPart;
    const macroRegionId = region.id;
    return (
      <RouteSwitch>
        <Redirect from={'/' + routePart + '/' + year} to={'/' + routePart}/>
        <Route 
          path={'/' + routePart + '/:year'}
          render={(props) => <CalendarPage macroregion={macroRegionId} year={props.match.params.year}/>}   
        />
        <Route 
          path={'/' + routePart}
          render={(props) => <CalendarPage macroregion={macroRegionId} year={year}/>}   
        />
      </RouteSwitch>
    );
  }

export function CalendarRouting(props: Props) {
    return (
        <RouteSwitch>
            <Route 
                exact={true} 
                path="/" 
                render={() => <CalendarPage year={props.year}/>}
            />
            {props.regions.map(region => calendarRoute(region, props.year))}
      </RouteSwitch>
    );
}