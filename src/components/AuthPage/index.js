import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { authorize } from '../../actions/auth';
import {
  getName,
  getToken,
  getIsAuthorized
} from '../../reducers/auth';
import { getTokenFromLocalStorage } from '../../localStorage';

class AuthPage extends PureComponent {
  state = {
    name: this.props.name,
    token: this.props.token
  };

  componentDidMount() {
    const token = getTokenFromLocalStorage();
    if (token) {
      this.setState({ token });
    }
  }

  componentWillReceiveProps(newProps) {
    const { name, token, isAuthorized, history } = newProps;

    console.log(
      'Auth Page WillReceiveProps',
      name,
      token,
      isAuthorized,
      history
    );

    isAuthorized &&
      token &&
      this.props.history.push(`/user/${name}`);
  }

  onSubmit = evt => {
    this.props.authorize(this.state);
  };

  onChange = evt => {
    const key = evt.target.id;
    const value = evt.target.value;
    this.setState({
      [key]: value
    });
  };

  render() {
    const { name } = this.props;

    return (
      <div className="">
        <h1>GitHub folowers</h1>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={this.onChange}
        />
        <br />
        <label htmlFor="token">Token: </label>
        <input
          type="text"
          id="token"
          value={this.state.token}
          onChange={this.onChange}
        />
        <button onClick={this.onSubmit}>
          GET FOLLOWERS
        </button>
        <p>
          Получить токен нужно на своей странице github,
          перейдите по{' '}
          <a href="https://github.com/settings/tokens">
            адресу
          </a>{' '}
          и создайте себе токен. Запишите куда нибудь токен,
          так как после создания доступ к нему будет только
          один раз.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: getName(state),
  token: getToken(state),
  isAuthorized: getIsAuthorized(state)
});

const mapDispatchToProps = {
  authorize
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AuthPage
);
