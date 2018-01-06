import * as React from 'react';
import { IconButton } from 'material-ui';
import ChevronDownIcon from 'mdi-material-ui/ChevronDown';
import ChevronUpIcon from 'mdi-material-ui/ChevronUp';

interface ExpandIconButtonProps {
    expanded: boolean;
    onClick: () => void;
}

export class ExpandIconButton extends React.Component<ExpandIconButtonProps, {}> {
    render() {
        return (
            <IconButton
              onClick={this.props.onClick}
              aria-expanded={this.props.expanded}
              aria-label="Show more"
            >
             {this.props.expanded ? <ChevronUpIcon/ > :  <ChevronDownIcon/>}
            </IconButton>
        );
    }
}