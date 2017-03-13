import express from 'express';
import http from 'http';

//using brackets because isDevelopement is not exported as default.
import {isDevelopement} from './settings';

//----------------
// Setup

const app = express();
const server = new http.Server(app);

//----------------
// Configuration

app.set("view engine","pug");
app.use(express.static("public")); //tell express to serve out any file in the public folder. Example: favicon.ico

const useExternalStyles = !isDevelopement;
const scriptRoot = isDevelopement
    ? "http://localhost:9000/build/"
    : "/build";

app.get("*",(req,res) => {
  res.render("index",{
    useExternalStyles,
    scriptRoot
  })
});

//----------------
// Startup
const port = process.env.PORT || 3000;
server.listen(port,()=>{
  console.log(`Started http server on port ${port}`);
})
