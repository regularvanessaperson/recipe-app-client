import React, { Fragment, useState, useEffect } from 'react';

//toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"


//components
import Layout from './components/common/Layout'
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Register from "./components/Register"
import Lists from "./components/Lists"
import Recipes from "./components/Recipes"


toast.configure()
const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  //this will check if person is still validated
  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/verified", {
        method: "GET",
        headers: { token: localStorage.token }
      })

      const parseRes = await response.json()

      //checks if user is authenticated 
      parseRes === true ? setIsAuthenticated(true) :
        setIsAuthenticated(false);

      // console.log(parseRes);
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  })

  return (
    <Fragment>
      <Router>
        <Layout>
          <div className="container">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login"
                render={props =>
                  !isAuthenticated ? (<Login  {...props} setAuth={setAuth} />) : (
                    <Redirect to="/dashboard" />
                  )} />
              <Route exact path="/register"
                render={props =>
                  !isAuthenticated ? (<Register  {...props} setAuth={setAuth} />) : (
                    <Redirect to="/login" />
                  )} />
              <Route exact path="/dashboard"
                render={props =>
                  isAuthenticated ? (<Dashboard  {...props} setAuth={setAuth} />) : (
                    <Redirect to="/login" />
                  )} />
              <Route exact path="/lists"
                render={props =>
                  isAuthenticated ? (<Lists  {...props} setAuth={setAuth} />) : (
                    <Redirect to="/login" />
                  )} />
              <Route exact path="/recipes"
                render={props =>
                  isAuthenticated ? (<Recipes  {...props} setAuth={setAuth} />) : (
                    <Redirect to="/login" />
                  )} />
            </Switch>
          </div>
        </Layout>
      </Router>
    </Fragment>
  );
}

export default App;
