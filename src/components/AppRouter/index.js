import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  getIsAuthorized,
  getName
} from '../../reducers/auth';
import AuthPage from '../AuthPage';
import UserPage from '../UserPage';
import PrivateRoute from '../PrivateRoute';
// import './AppRouter.css';

class AppRouter extends PureComponent {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/login" exact component={AuthPage} />
          <PrivateRoute
            path="/user/:name"
            component={UserPage}
          />
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  name: getName(state)
});
const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppRouter)
);
