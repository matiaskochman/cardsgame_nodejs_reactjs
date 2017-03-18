import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import AppContainer from './components/app';
import Lobby from './components/lobby';
import Game from './components/game';

export default function(){
  //return <AppContainer/>;
  return (
    <Route path="/" components={AppContainer}>
      {/* if nothing matches goes to Lobby*/}
      <IndexRoute components={Lobby}/>
      <Route path="/game/:gameId" components={Game}/>
      {/*if nothing matches goes to / */}
      <Redirect from="*" to="/"/>
    </Route>
  );
}
