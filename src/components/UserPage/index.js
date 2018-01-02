import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class UserPage extends PureComponent {
  render() {
    return (
      <div>
        <h1>User Page</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  UserPage
);
