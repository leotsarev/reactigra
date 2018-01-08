import * as React from 'react';
import { GameModel } from '../model/game';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardContent from 'material-ui/Card/CardContent';
import Chip from 'material-ui/Chip/Chip';
import { GameStatus } from './GameStatus';
import { GameDate } from './GameDate';
import { GameType } from './GameType';
import Collapse from 'material-ui/transitions/Collapse';
import { GameSocial } from './GameSocial';
import { ExpandIconButton } from './ExpandIconButton';

interface GameRowState {
    expanded: boolean;
}

export class GameRow extends React.Component<GameModel, GameRowState> {
    state = { expanded: false};

    handleExpandClick = () => this.setState({expanded: !this.state.expanded});

    render() {
        const game = this.props;
        return (
        <div key={game.id}>
        <Card>
            <CardHeader 
                title={
                    <span>{game.name} 
                        <ExpandIconButton
                            expanded={this.state.expanded}
                            onClick={this.handleExpandClick}
                        />
                    </span>}
            />
            
            <Collapse in={this.state.expanded}>
                <CardContent>
                    <span style={{display: 'flex'}} >
                        <GameStatus status={game.status} /> 
                        <GameDate begin={game.beginDate} duration={game.duration} />
                        <Chip
                            avatar={<GameType type={game.type} />} 
                            label={game.subregion.shortName + ': ' + game.polygon.name}
                        />
                        <Chip label={game.playersCount + ' игроков'} />
                        <Chip label={game.mg} />
                    </span>
                </CardContent>
                <GameSocial {...game} />
            </Collapse>
        </Card>
        </div>
        );
    }
}