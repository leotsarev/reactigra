import { GameTypeEnum } from '../model/game';
import * as React from 'react';
import PineTree from 'mdi-material-ui/PineTree';

interface GameTypeProps {
    type: GameTypeEnum;
}
export class GameType extends React.Component<GameTypeProps, {}> {
    render() {
        switch (this.props.type) {
            case GameTypeEnum.Forest:
                return <PineTree titleAccess="Игра в лесу" />;
            default: throw new Error('Неизвестный тип');
        }
    }
}