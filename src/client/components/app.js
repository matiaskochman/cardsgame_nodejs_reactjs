import "./app.scss";
import React, {Component} from 'react';

class AppContainer extends Component{

  componentWillMount(){
    console.log("hola pianola solo se ve 1 vez por el modulo react-hot-loader");
  }

  render(){
    const {main,sidebar} =  this.props;
    return(
      <div className={`c-application`}>
        <div className="inner">
          <div className="sidebar">
            {sidebar}
          </div>
          <div className="main">
            {main}
          </div>
        </div>
      </div>
    );
  }

  _click(){
    console.log("Stuff");
  }
}


export default AppContainer;
