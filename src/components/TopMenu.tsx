import * as classNames from 'classnames';
import * as React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import { AppBar, Toolbar, Typography, Button } from 'material-ui';
import { Link } from 'react-router-dom';

interface TopMenuProps {

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

export const TopMenu = decorate<TopMenuProps>(
    ({classes}) => (
        <AppBar className={classNames(classes.appBar)} >
            <Toolbar>
                <Typography type="title" color="inherit">
                    <Link to="/"><Button color="contrast">Когда-Игра</Button></Link>
                    <a href="http://rpg.ru/newb"><Button color="contrast">Новичку</Button></a>
                    <Link to="/about"><Button color="contrast">О сайте</Button></Link>
                </Typography>
            </Toolbar>
        </AppBar>
    )
);