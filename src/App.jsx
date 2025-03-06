import { useState } from 'react'
import Components from "./Components/Components.jsx";
import './App.css'
//import * as Env from './environments.js'
import Parse from 'parse'

const Env = {
  APPLICATION_ID: "mHEinGaD7EJLQNC9sXnY5fqHVPys1SAgPH428T3j",
  JAVASCRIPT_KEY: "ZjOrgNXKZOQkMsyD8KVtTdXWWh76lwpxil33xeNX",
  SERVER_URL: "https://parseapi.back4app.com"
};

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {

  return (
    <>
      <h1>App</h1>
      <Components />
    </>
  )
}

export default App
