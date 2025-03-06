import React from "react";
import Components from "./Components/Components.js";
import './App.css'
//import * as Env from './environments.js'
import Parse from 'parse'

Env = {
  APPLICATION_ID: "mHEinGaD7EJLQNC9sXnY5fqHVPys1SAgPH428T3j",
  JAVASCRIPT_KEY: "ZjOrgNXKZOQkMsyD8KVtTdXWWh76lwpxil33xeNX",
  SERVER_URL: "https://parseapi.back4app.com"
};

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY)
Parse.serverURL = Env.SERVER_URL

const App = () => {
  return <Components />;
};

export default App;
