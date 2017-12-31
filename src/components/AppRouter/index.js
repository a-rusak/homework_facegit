import React, {PureComponent} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import AuthPage from '../AuthPage';
import PrivateRoute from '../PrivateRoute';
// import './AppRouter.css';

class AppRouter extends PureComponent {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/login" exact component={AuthPage} />
          <PrivateRoute path="/user/:name" />
          <Redirect from="*" to="/login" />
        </Switch>
      </div>
    );
  }
}

export default AppRouter;
