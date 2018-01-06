import * as React from 'react';
import { CalendarPage } from './pages/CalendarPage';
import { About } from './pages/About';
import { BrowserRouter, Route, Switch as RouteSwitch, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import AppBar from 'material-ui/AppBar/AppBar';
import { Toolbar, Typography, Reboot } from 'material-ui';
import Button from 'material-ui/Button/Button';
import { MacroRegionModel } from './model/game';
import { RegionAPI } from './api/regions';
import { RegionMenu } from './components/RegionMenu';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import * as classNames from 'classnames';

const appBarHeight = 64; // TODO dedup

const decorate = withStyles(({ palette, spacing, mixins, breakpoints, zIndex }) => ({
    root: {
        width: '100%',
        marginTop: spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden' as 'hidden',
      },
      appFrame: {
        marginTop: appBarHeight,
        position: 'relative' as 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
      },
      appBar: {
        position: 'absolute' as 'absolute',
        width: `100%`,
        height: appBarHeight,
      },
      drawerHeader: mixins.toolbar,
      content: {
        backgroundColor: palette.background.default,
        width: '100%',
        padding: spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [breakpoints.up('sm')]: {
          height: 'calc(100% - 64px)',
          marginTop: 64,
        },
      },
  }));

function currentYear(): number {
    const now = new Date();
    return (now.getMonth() > 10) ? (now.getFullYear() + 1) : now.getFullYear();
}

interface AppState {
    regions: Readonly<MacroRegionModel[]>;
    year: number;
}

interface Props {
  hello: string;
}

type AppProp = 
  Props & WithStyles<'root'> & WithStyles<'appFrame'> & WithStyles<'appBar'> & WithStyles<'appBarLeft'>
 & WithStyles<'drawerHeader'> & WithStyles<'content'>;

export const AppDecorated = decorate<{}>(

    class extends React.Component<AppProp, AppState> {
     
      constructor(props: AppProp) {
        super(props);
        this.state = {
            regions: [],
            year: currentYear()
        };
      }

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
      const { classes } = this.props;
      return (
            <div className={classes.root}>
                <Reboot>
                  <BrowserRouter>
                    <div>
                        <AppBar className={classNames(classes.appBar, classes.appBarLeft)} >
                          <Toolbar>
                            <Typography type="title" color="inherit">
                              <Link to="/"><Button color="contrast">Когда-Игра</Button></Link>
                              <a href="http://rpg.ru/newb"><Button color="contrast">Новичку</Button></a>
                              <Link to="/about"><Button color="contrast">О сайте</Button></Link>
                            </Typography>
                          </Toolbar>
                        </AppBar>
                        <div className={classes.appFrame}>
                        <RegionMenu regions={this.state.regions}/>
                        <Route path="/about" component={About}/>
                        <Route 
                          exact={true} 
                          path="/" 
                          render={(props) => <CalendarPage year={this.state.year}/>}
                        />
                        {this.state.regions.map(this.calendarRoute.bind(this))}
                        </div>
                      </div>
                  </BrowserRouter>
                </Reboot>
              </div>
 );
    }
}
);