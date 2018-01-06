import { MacroRegionModel } from '../model/game';
import * as React from 'react';
import Drawer from 'material-ui/Drawer/Drawer';
import { Link } from 'react-router-dom';
import { Button, withStyles } from 'material-ui';
import { WithStyles } from 'material-ui/styles/withStyles';

const decorate = withStyles(({ palette, spacing, mixins, breakpoints }) => ({
      drawerPaper: {
        height: '100%',
        position: 'relative' as 'relative',
      },
      drawerHeader: mixins.toolbar,
  }));
  
interface RegionMenuProps {
    regions: Readonly<MacroRegionModel[]>;
}

function calendarLink(region: MacroRegionModel) {
    return <Link to={'/' + region.urlPart}><Button>{region.name}</Button></Link>;
  }

type Props = RegionMenuProps & WithStyles<'drawerPaper'> & WithStyles<'drawerHeader'>;

export const RegionMenu = decorate<RegionMenuProps>(
    class extends React.Component< Props, {}> {
        render() {
            return (
                <Drawer
                    type="permanent"
                    anchor="left"
                    classes={{
                        paper: this.props.classes.drawerPaper
                    }}
                >
                    {this.props.regions.map(calendarLink)}
                </Drawer>
            );
        }
    }
);