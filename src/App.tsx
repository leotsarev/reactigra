import * as React from 'react';
import { CalendarPage } from './pages/CalendarPage';
import { About } from './pages/About';
import { BrowserRouter, Route, Switch as RouteSwitch, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import AppBar from 'material-ui/AppBar/AppBar';
import { Toolbar, Typography } from 'material-ui';
import Button from 'material-ui/Button/Button';
import { MacroRegionModel } from './model/game';
import { RegionAPI } from './api/regions';

function currentYear(): number {
  const now = new Date();
  return (now.getMonth() > 10) ? (now.getFullYear() + 1) : now.getFullYear();
}

function calendarLink(region: MacroRegionModel) {
  return <Link to={'/' + region.urlPart}><Button color="contrast">{region.name}</Button></Link>;
}

interface AppState {
    regions: Readonly<MacroRegionModel[]>;
    year: number;
}

export class App extends React.Component<{}, AppState> {
    state = {
        regions: [],
        year: currentYear()
    };

    public async componentDidMount() {
        const regions = await RegionAPI.fetchRegions();
        this.setState({regions: regions});
    }

    calendarRoute(region: MacroRegionModel) {
        const year = this.state.year;
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

    render() {
        return (
        <BrowserRouter>
    <div>
        <AppBar position="static" >
        <Toolbar>
          <Typography type="title" color="inherit">
            <Link to="/"><Button color="contrast">Когда-Игра</Button></Link>
            <Link to="http://rpg.ru/newb"><Button color="contrast">Новичку</Button></Link>
            <Link to="/about"><Button color="contrast">О сайте</Button></Link>
          </Typography>
        </Toolbar>
        <Toolbar>
          <Typography type="subheading" color="inherit">
            {this.state.regions.map(calendarLink)}
          </Typography>
        </Toolbar>
        </AppBar>
        <Route path="/about" component={About}/>
        <Route 
          exact={true} 
          path="/" 
          render={(props) => <CalendarPage year={this.state.year}/>}
        />
        {this.state.regions.map(this.calendarRoute.bind(this))}
      </div>
 </BrowserRouter>
 );
    }
}