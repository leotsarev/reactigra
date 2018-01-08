import * as React from 'react';
import { About } from './pages/About';
import { BrowserRouter, Route, Switch as RouteSwitch } from 'react-router-dom';
import { Reboot } from 'material-ui';
import { MacroRegionModel } from './model/game';
import { GlobalConfigAPI } from './api/globalConfig';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { CalendarRouting } from './CalendarRouting';

const decorate = withStyles(({ palette, spacing, mixins, breakpoints, zIndex }) => ({
    root: {
        width: '100%',
        marginTop: spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden' as 'hidden',
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
    currentYear: number;
    firstYear: number;
    lastYear: number;
}

interface Props {
  hello: string;
}

type AppProp = 
  Props & WithStyles<'root'> & WithStyles<'drawerHeader'> & WithStyles<'content'>;

export const AppDecorated = decorate<{}>(

    class extends React.Component<AppProp, AppState> {
      state = {
        regions: [],
        currentYear: currentYear(),
        firstYear: currentYear(),
        lastYear: currentYear(),
      };

      public async componentDidMount() {
          const regions = await GlobalConfigAPI.fetchRegions();
          const yearRange = await GlobalConfigAPI.fetchYearRange();
          this.setState({regions: regions, firstYear: yearRange.first, lastYear: yearRange.last});
      }

      render() {
        const { classes } = this.props;
        return (
          <Reboot>
            <BrowserRouter>
              <div className={classes.root}>
                    <RouteSwitch>
                      <Route path="/about" component={About}/>
                      <CalendarRouting 
                        regions={this.state.regions} 
                        defaultYear={this.state.currentYear}
                        firstYear={this.state.firstYear}
                        lastYear={this.state.lastYear}
                      />
                    </RouteSwitch>
              </div>
            </BrowserRouter>
          </Reboot>
        );
      }
  }
);