import './game.scss';

import React,{Component} from 'react';

class GameComponent extends Component{

  render(){
    return(
      <p>Game Componenet</p>
    );
  }
}

class GameSideBar extends Component{

  render(){
    return(
      <p>Game SideBar</p>
    );
  }
}

export default {
  main: GameComponent,
  sidebar: GameSideBar
};
