import * as React from 'react';
import { About } from './pages/About';
import { BrowserRouter, Route, Switch as RouteSwitch } from 'react-router-dom';
import { Reboot } from 'material-ui';
import { MacroRegionModel } from './model/game';
import { RegionAPI } from './api/regions';
import { RegionMenu } from './components/RegionMenu';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { TopMenu } from './components/TopMenu';
import { CalendarRouting } from './CalendarRouting';

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
  Props & WithStyles<'root'> & WithStyles<'appFrame'> & WithStyles<'drawerHeader'> & WithStyles<'content'>;

export const AppDecorated = decorate<{}>(

    class extends React.Component<AppProp, AppState> {

      state = {
        regions: [],
        year: currentYear()
      };

      public async componentDidMount() {
          const regions = await RegionAPI.fetchRegions();
          this.setState({regions: regions});
      }

      render() {
        const { classes } = this.props;
        return (
          <Reboot>
            <BrowserRouter>
              <div className={classes.root}>
                <TopMenu />
                <div className={classes.appFrame}>
                  <RegionMenu regions={this.state.regions}/>
                    <RouteSwitch>
                      <Route path="/about" component={About}/>
                      <CalendarRouting regions={this.state.regions} year={this.state.year}/>
                    </RouteSwitch>
                </div>
              </div>
            </BrowserRouter>
          </Reboot>
        );
      }
  }
);