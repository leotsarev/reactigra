import { MacroRegionModel } from '../model/game';
import * as React from 'react';
import Drawer from 'material-ui/Drawer/Drawer';
import { withStyles, MenuList } from 'material-ui';
import { WithStyles } from 'material-ui/styles/withStyles';
import MenuItem from 'material-ui/Menu/MenuItem';
import { CalendarLink } from './CalendarLink';

const decorate = withStyles(({ palette, spacing, mixins, breakpoints }) => ({
      drawerPaper: {
        height: '100%',
        position: 'relative' as 'relative',
      },
      drawerHeader: mixins.toolbar,
  }));
  
interface RegionMenuProps {
    regions: Readonly<MacroRegionModel[]>;
    currentYear?: number;
}

type Props = RegionMenuProps & WithStyles<'drawerPaper'> & WithStyles<'drawerHeader'>;

export const RegionMenu = decorate<RegionMenuProps>(
    class extends React.Component< Props, {}> {
        
         calendarLink(region: MacroRegionModel) {
            return (
                <CalendarLink region={region} year={this.props.currentYear} key={region.urlPart}>
                    <MenuItem>{region.name}</MenuItem>
                </CalendarLink>
            );
        }

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
                        {this.props.regions.map(region => this.calendarLink(region))}
                    </MenuList>
                </Drawer>
            );
        }
    }
);