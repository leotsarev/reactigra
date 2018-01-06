import * as React from 'react';
import { MacroRegionModel } from './model/game';
import { CalendarPage } from './pages/CalendarPage';
import { Route, Switch as RouteSwitch, Redirect } from 'react-router-dom';

interface Props {
    regions: Readonly<MacroRegionModel[]>;
    year: number;
}

export class CalendarRouting extends React.Component<Props, {}> {

    calendarRoute(region: MacroRegionModel) {
        const year = this.props.year;
        return (
          <RouteSwitch key={region.id}>
            <Redirect from={'/' + region.urlPart + '/' + year} to={'/' + region.urlPart}/>
            <Route 
              path={'/' + region.urlPart + '/:year'}
              render={
                  (props) => 
                    <CalendarPage 
                        macroregion={region.id} 
                        year={props.match.params.year} 
                        regions={this.props.regions}
                    />}   
            />
            <Route 
              path={'/' + region.urlPart}
              render={
                (props) => 
                  <CalendarPage 
                      macroregion={region.id} 
                      year={year} 
                      regions={this.props.regions}
                  />}  
            />
          </RouteSwitch>
        );
      }

    render() {
        return (
            <RouteSwitch>
                <Route 
                    exact={true} 
                    path="/" 
                    render={() => <CalendarPage year={this.props.year} regions={this.props.regions}/>}
                />
                {this.props.regions.map(region => this.calendarRoute(region))}
        </RouteSwitch>
        );
    }
}