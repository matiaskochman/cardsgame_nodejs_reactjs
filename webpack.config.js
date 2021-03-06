var path = require("path"),
    _ = require("lodash"),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

const vendor = [
  "lodash",
  "react",
  "react-dom",
  "react-router",
  "socket.io-client",
  "rxjs"
];

function createConfig(isDebug){
 //const devtool = isDebug ? "cheap-module-source-map" : null;
 const devtool = isDebug ? "eval-source-map" : null; //for debugging the source maps
 const plugins = [

   new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
   new webpack.DefinePlugin({
     "process.env" : {
       NODE_ENV : `"${process.env.NODE_ENV || "developement "}"`
     },
     IS_PRODUCTION: !isDebug,
     IS_DEVELOPEMENT: isDebug
   })
 ];

 const loaders = {
   js: {test:/\.jsx?$/, loader: "babel", exclude: /node_modules/},
   eslint: {test:/\.jsx?$/, loader: "eslint", exclude: /node_modules/},
   json: {test:/\.json$/, loader: "json"},
   css: {test:/\.css$/, loader: "style!css?sourceMap"},
   sass: {test:/\.scss$/, loader: "style!css?sourceMap!sass?sourceMap"},
   files: {test:/\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/, loader: "url-loader?limit=5000"},
 }

 const clientEntry = ["babel-polyfill","./src/client/client.js"];
 let publicPath = "/build/";

 if(isDebug){
   plugins.push(new webpack.HotModuleReplacementPlugin());
   clientEntry.unshift(
     "react-hot-loader/patch",
     "webpack-dev-server/client?http://localhost:9000/",
     "webpack/hot/only-dev-server"
   );
   publicPath = "http://localhost:9000/build/";
 }else{
   plugins.push(
     new webpack.optimize.DedupePlugin(),
     new ExtractTextPlugin("[name].css"),
     new webpack.optimize.UglifyJsPlugin({warnings:false})
   );

   //ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
   //{ notExtractLoader: 'style-loader', loader: 'css-loader' }
   loaders.css.loader = ExtractTextPlugin.extract({ notExtractLoader: 'style', loader: 'css' });
   loaders.sass.loader = ExtractTextPlugin.extract({ notExtractLoader: 'style', loader: 'css!sass' });

 }

 console.log("isDebug: " +isDebug);
 console.log("process.env.NODE_ENV: "+process.env.NODE_ENV )
 return {
   name:"client",
   devtool,
   entry: {
     app:clientEntry,
     vendor
   },
   output : {
     path : path.join(__dirname,"public","build"),
     filename: "[name].js",
     publicPath
   },
   resolve : {
     extensions:["",".js",".jsx"],
     alias:{
       shared: path.join(__dirname,"src","server","shared")
     }
   },
   module: {
     loaders: _.values(loaders)
   },
   plugins
 };
}

module.exports = createConfig(process.env.NODE_ENV !== "production");
module.exports.create = createConfig;
