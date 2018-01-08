import * as React from 'react';
import { GameModel } from '../model/game';
import VkBox from 'mdi-material-ui/VkBox';
import FacebookBox from 'mdi-material-ui/FacebookBox';
import Web from 'mdi-material-ui/Web';
import { CardActions } from 'material-ui';
import AtIcon from 'mdi-material-ui/At';

export class GameSocial extends React.Component<GameModel, {}> {
    render() {
        const game = this.props;
        return (
            <CardActions>
                {game.email && <a href={game.email.toString()}><AtIcon /> </a>}
                {game.vkClub && <a href={'https://vk.com/' + game.vkClub}> <VkBox/></a>}
                {game.ljClub && <a href={'http://' + game.ljClub + '.livejournal.com'}>[lj]</a>}
                {game.fbClub && <a href={'https://fb.com/' + game.fbClub}> <FacebookBox /></a>}
                {game.uri && <a href={game.uri.toString()}> <Web /></a>}
            </CardActions>
        );
    }
}