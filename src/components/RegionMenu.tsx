import { MacroRegionModel } from '../model/game';
import * as React from 'react';
import Drawer from 'material-ui/Drawer/Drawer';
import { Link } from 'react-router-dom';
import { withStyles, MenuList } from 'material-ui';
import { WithStyles } from 'material-ui/styles/withStyles';
import MenuItem from 'material-ui/Menu/MenuItem';

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
    return <Link to={'/' + region.urlPart} key={region.urlPart}><MenuItem>{region.name}</MenuItem></Link>;
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
                    <MenuList>
                        {this.props.regions.map(calendarLink)}
                    </MenuList>
                </Drawer>
            );
        }
    }
);