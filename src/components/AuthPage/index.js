import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { authorize } from '../../actions/auth';

class AuthPage extends PureComponent {
  state = {
    name: `dex157`,
    token: ``
  };

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
    return (
      <div className="">
        <h1>GitHub folowers</h1>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={this.state.name}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  authorize
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AuthPage
);
