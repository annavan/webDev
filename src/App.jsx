import { useState } from 'react'
import Components from "./Components/Components.js";
import './App.css'
//import * as Env from './environments.js'
import Parse from 'parse'

Env = {
  APPLICATION_ID: "mHEinGaD7EJLQNC9sXnY5fqHVPys1SAgPH428T3j",
  JAVASCRIPT_KEY: "ZjOrgNXKZOQkMsyD8KVtTdXWWh76lwpxil33xeNX",
  SERVER_URL: "https://parseapi.back4app.com"
};

function App() {

  return (
    <>
    {/* print text in black */}
    <h1>App</h1>
    <Components />

    </>
  )
}

export default App
