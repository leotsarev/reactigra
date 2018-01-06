import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import { CalendarPage } from './pages/CalendarPage';
import { About } from './pages/About';
import 'typeface-roboto';
import { BrowserRouter, Route, NavLink, Switch as RouteSwitch } from 'react-router-dom';
import { Redirect } from 'react-router';

function currentYear(): number {
  const now = new Date();
  return (now.getMonth() > 10) ? (now.getFullYear() + 1) : now.getFullYear();
}

function calendarRoute(routePart: string, macroRegionId: number) {
  const year = currentYear();
  return (
    <RouteSwitch>
      <Redirect from={'/' + routePart + '/' + year} to={'/' + routePart}/>
      <Route 
        path={'/' + routePart + '/:year'}
        render={(props) => <CalendarPage macroregion={macroRegionId} year={props.match.params.year}/>}   
      />
      <Route 
        path={'/' + routePart}
        render={(props) => <CalendarPage macroregion={macroRegionId} />}   
      />
    </RouteSwitch>
  );
}
ReactDOM.render(
  <BrowserRouter>
    <div>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/spb">Spb</NavLink></li>
          <li><NavLink to="/msk">Msk</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>

        <hr/>

        <Route path="/about" component={About}/>
        <Route 
          exact={true} 
          path="/" 
          render={(props) => <CalendarPage />}
        />
        {calendarRoute('spb', 1)}
        {calendarRoute('msk', 3)}
      </div>
 </BrowserRouter>,
  document.getElementById('root')
);  