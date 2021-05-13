import React,{createContext,useReducer} from 'react';
import {Route, Switch} from 'react-router-dom';
// import ReactDOM from 'react-dom';

// css link
import './style/login.css';


import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import Logout from './components/Logout';
import Error from './components/Error';
import Update from './components/Update';

import {initialState, reducer} from './reducer/Usereducer';
// 1: ContextAPI
export const UserContext = createContext();


const App = () =>{

  const [state, dispatch] = useReducer(reducer, initialState)

  return(
    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/contact" component={Contact}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/logout" component={Logout}/>
        <Route exact path="/update/:id" component={Update}/>
        <Route exact path="*" component={Error}/>
      </Switch>
    </UserContext.Provider>
    </>
  );
}

export default App;
