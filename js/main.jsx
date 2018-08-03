import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import {Provider} from "react-redux";
import Root from "./root.jsx";
import Actions from "./actions";
const DEBUG = true;

const main = document.querySelector(`.main`); 

ReactDOM.render(<Provider store={store}>
  <Root/>
</Provider>, main);

if(DEBUG){
  store.dispatch(Actions.debug());
}