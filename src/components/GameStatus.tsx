import * as React from 'react';
import '../index.css';
import { GameStatusEnum } from '../model/game';
import ThumbUp  from 'mdi-material-ui/ThumbUp';
import { Chip } from 'material-ui';

interface GameStatusProps {
    status: GameStatusEnum;
}
export class GameStatus extends React.Component<GameStatusProps, {}> {
    render() {
        switch (this.props.status) {
            case GameStatusEnum.Ok:
                return (
                    <Chip 
                        avatar={<ThumbUp titleAccess="Игра скорее всего состоится в указанное время" />} 
                        label="Ok" 
                    />
                );
            case GameStatusEnum.Passed:
                return (
                    <Chip 
                        avatar={<ThumbUp color={'action'} titleAccess="Игра прошла в указанные даты" />} 
                        label="Прошла" 
                    />
                );    
            default: throw new Error('Неизвестный статус');
        }
    }
}