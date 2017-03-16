import "./app.scss";
import React, {Component} from 'react';

class AppContainer extends Component{

  componentWillMount(){
    console.log("hola pianola solo se ve 1 vez por el modulo react-hot-loader");
  }

  render(){
    return(
      <h1>Hello work! pianola</h1>
    );
  }
}

export default AppContainer;
