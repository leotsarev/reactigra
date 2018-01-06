import * as classNames from 'classnames';
import * as React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import { AppBar, Toolbar, Button, Select, MenuItem } from 'material-ui';
import { Link } from 'react-router-dom';

interface TopMenuProps {
    firstYear: number;
    selectedYear: number;
    lastYear: number;
    onYearChanged: (year: number) => void;
}

const appBarHeight = 64; // TODO dedup

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

const range =
 (start: number, count: number) =>
    Array.apply(0, Array(count)).map((element: number, index: number) => (index + start));  

function generateSelect(props: TopMenuProps) {
    const yearArray = range(props.firstYear, props.lastYear - props.firstYear + 1);
    return yearArray.map(
        (year: number) => <MenuItem value={year} key={year}> {year} </MenuItem>
    );
}

export const TopMenu = decorate<TopMenuProps>(
    (props) => (
        <AppBar className={classNames(props.classes.appBar)} >
            <Toolbar>
                    <Link to="/"><Button color="contrast">Когда-Игра</Button></Link>
                    <Select 
                        value={props.selectedYear} 
                        onChange={(event) => props.onYearChanged(parseInt(event.target.value, 10))}
                    >
                        {generateSelect(props)}
                    </Select>
                    <a href="http://rpg.ru/newb"><Button color="contrast">Новичку</Button></a>
                    <Link to="/about"><Button color="contrast">О сайте</Button></Link>

            </Toolbar>
        </AppBar>
    )
);