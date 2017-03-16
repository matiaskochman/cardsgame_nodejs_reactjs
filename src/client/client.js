import "./client.scss";


import ReactDom from 'react-dom';



function main(){
  const routes = require('./routes').default(); // .default required by require
  ReactDom.render(routes,document.getElementById("mount"));
}

main();

if(module.hot){
  module.hot.accept('./routes',() => {
    main();
  });
}
