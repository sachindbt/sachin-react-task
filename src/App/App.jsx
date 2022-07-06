import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
function App() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <div className="jumbotron">
      <div className="container">
        <div className="col-md-12">
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <Router history={history}>
            <ul className="nav justify-content-between">
              <div className="brands">
                <h3>Sachin Test</h3>
              </div>
              {loggedIn !== true && (
                <div className="menu d-flex">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Register
                    </Link>
                  </li>
                </div>
              )}
              {loggedIn == true && (
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    logout
                  </Link>
                </li>
              )}
            </ul>
            <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export { App };
