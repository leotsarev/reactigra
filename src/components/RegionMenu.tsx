import { MacroRegionModel } from '../model/game';
import * as React from 'react';
import Drawer from 'material-ui/Drawer/Drawer';
import { Link } from 'react-router-dom';
import { Button } from 'material-ui';

interface RegionMenuProps {
    regions: Readonly<MacroRegionModel[]>;
}

function calendarLink(region: MacroRegionModel) {
    return <Link to={'/' + region.urlPart}><Button>{region.name}</Button></Link>;
  }

export class RegionMenu extends React.Component<RegionMenuProps, {}> {
    render() {
        return (
            <Drawer
                type="permanent"
                anchor="left"
                style={{position: 'relative'}}
            >
                {this.props.regions.map(calendarLink)}
            </Drawer>
        );
    }
}