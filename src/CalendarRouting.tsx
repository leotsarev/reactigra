import * as React from 'react';
import { MacroRegionModel } from './model/game';
import { CalendarPage } from './pages/CalendarPage';
import { Route } from 'react-router-dom';
import { Redirect, Switch } from 'react-router';

interface Props {
    regions: Readonly<MacroRegionModel[]>;
    defaultYear: number;
    firstYear: number;
    lastYear: number;
}

export class CalendarRouting extends React.Component<Props, {}> {

    calendarRoute(region: MacroRegionModel) {
        return (
          <Switch key={region.id}>
            <Redirect
                    key={'redirect' + region.id}
                    from={'/' + region.urlPart} 
                    to={'/' + region.urlPart + '/2018'}
                    exact={true}
            />
            <Route 
                exact={true}
                key={'withYear' + region.id}
                path={'/' + region.urlPart + '/:year'}
                render={
                    (props) => 
                        <CalendarPage 
                            currentRegion={region} 
                            selectedYear={+props.match.params.year} 
                            regions={this.props.regions}
                            firstYear={this.props.firstYear}
                            lastYear={this.props.lastYear}
                        />}   
            />
          </Switch>
        );
      }

    render() {
        return (
            <React.Fragment>
                <Route 
                    key="default"
                    exact={true} 
                    path="/" 
                    render={() => 
                        <CalendarPage 
                            selectedYear={this.props.defaultYear} 
                            regions={this.props.regions}
                            firstYear={this.props.firstYear}
                            lastYear={this.props.lastYear}
                        />}
                />
                {this.props.regions.map(region => this.calendarRoute(region))}
        </React.Fragment>
        );
    }
}