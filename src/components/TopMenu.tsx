import * as classNames from 'classnames';
import * as React from 'react';
import { WithStyles } from 'material-ui/styles/withStyles';
import { AppBar, Toolbar, Button, MenuItem, Menu, MenuList } from 'material-ui';
import { Link } from 'react-router-dom';
import { CalendarLink } from './CalendarLink';
import { MacroRegionModel } from '../model/game';

interface TopMenuProps {
    firstYear: number;
    selectedYear: number;
    lastYear: number;
    selectedRegion?: MacroRegionModel;
}

const range =
 (start: number, count: number) =>
    Array.apply(0, Array(count)).map((element: number, index: number) => (index + start));  

export class TopMenu extends React.Component<TopMenuProps & WithStyles<'appBar'>, {}> {
        state = {
            anchorEl: undefined,
        };

        generateSelect() {
            const yearArray = range(this.props.firstYear, this.props.lastYear - this.props.firstYear + 1);
            return yearArray.map(
                (year: number) => (
                    <MenuItem value={year} key={year} onClick={() => this.handleCloseMenu()}>
                        <CalendarLink year={year} region={this.props.selectedRegion}> {year} </CalendarLink> 
                    </MenuItem>)
            );
        }

        handleOnClick(event: React.MouseEvent<HTMLElement>) {
            this.setState({anchorEl: event.currentTarget });
        }

        handleCloseMenu() {
            this.setState({anchorEl: null});
        }

        render() {
            const {props} = this;
            return (
        <AppBar className={classNames(props.classes.appBar)} >
            <Toolbar>
                    <Link to="/"><Button color="contrast">Когда-Игра</Button></Link>
                    за <Button onClick={(ev) => this.handleOnClick(ev)}>{props.selectedYear.toString()}</Button> год
                    <Menu 
                        open={this.state.anchorEl != null}
                        anchorEl={this.state.anchorEl}
                        title={props.selectedYear.toString()}
                        onClose={() => this.handleCloseMenu()}
                    >
                        <MenuList>
                            {this.generateSelect()}
                        </MenuList>
                    </Menu>
                    
                    <a href="http://rpg.ru/newb"><Button color="contrast">Новичку</Button></a>
                    <Link to="/about"><Button color="contrast">О сайте</Button></Link>

            </Toolbar>
        </AppBar>
        );
    }
}