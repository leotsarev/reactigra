import * as React from 'react';
import { Calendar } from '../components/Calendar';
import { GameModel, MacroRegionModel } from '../model/game';
import { GameAPI } from '../api/games';
import { RegionMenu } from '../components/RegionMenu';
import { TopMenu } from '../components/TopMenu';
import { withStyles } from 'material-ui';
import { WithStyles } from 'material-ui/styles/withStyles';

const appBarHeight = 64; 

const decorate = withStyles(({ palette, spacing, mixins, breakpoints, zIndex }) => ({
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
  }));

export interface CalendarPageProps {
    currentRegion?: MacroRegionModel;
    regions: Readonly<MacroRegionModel[]>;
    selectedYear: number;
    firstYear: number;
    lastYear: number;
}

interface CalendarState {
    games: Readonly<GameModel[]>;
}

export const CalendarPage = decorate<CalendarPageProps>(
    class extends React.Component<CalendarPageProps & WithStyles<'appFrame'> & WithStyles<'appBar'>, CalendarState> {
    state = {
        games: []
    };

    // this is a hack. Better make GameAPI cancellable 
    private _isMounted: boolean;

    public async componentDidMount() {
        this._isMounted = true;
        const games = this.props.currentRegion === undefined 
            ? await GameAPI.fetchGames(this.props.selectedYear - 0) 
            : await GameAPI.fetchGamesByRegion(this.props.selectedYear - 0, this.props.currentRegion.id);
        if (this._isMounted) {
            this.setState({games: games});
        }
    }

    public componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div>
                <TopMenu 
                  firstYear={this.props.firstYear} 
                  lastYear={this.props.lastYear} 
                  selectedYear={this.props.selectedYear}
                  selectedRegion={this.props.currentRegion}
                  classes={{appBar: this.props.classes.appBar}}
                />
                <div className={this.props.classes.appFrame}>
                    <RegionMenu regions={this.props.regions} currentYear={this.props.selectedYear}/>
                    <Calendar calendar={this.state.games}/>
                </div>
            </div>
        );
    }
});