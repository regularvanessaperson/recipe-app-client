import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser,logout } from "../../services/auth.service";


const Layout = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
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
     // grab getCurrentuser from the auth service
    const user =  getCurrentUser();

    if (user) {
    // Set current user to the currentUser state
      setCurrentUser(user);
    }
  }, [])

  
  const logOut = () => {
    logout()
  }

  return (
    <div>
      <nav className="navbar navbar-expand sticky-top navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">
        <strong>Recipe List App</strong>  
        </Link>
        <div className="navbar-nav nav-tabs mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link active" aria-current="page">
                Profile
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/recipes"} className="nav-link">
                My Recipes
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/lists"} className="nav-link">
                My Lists
              </Link>
            </li>
          )}
          {/* {currentUser && (
            <li className="nav-item">
              <Link to={profUrl} className="nav-link">
               {currentUser.username}'s Profile
              </Link>
            </li>
          )} */}
        </div>
        
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                      Login
                  </Link>
              </li>
              <li className="nav-item">
                  <Link to={'/register'} className="nav-link">
                  Sign Up
                  </Link>
              </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">{props.children}</div>
    </div>
  );
};
export default Layout;