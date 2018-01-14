import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { request } from '../../actions/followers';
import Spinner from 'react-svg-spinner';

import {
  getData,
  getIsFetched,
  getIsFetching,
  getError
} from '../../reducers/followers';
import Follower from '../Follower';

class Followers extends PureComponent {
  componentDidMount() {
    this.props.request();
  }
  componentWillReceiveProps(newProps) {
    const name = this.props.name;
    const newName = newProps.name;
    if (name !== newName) {
      console.log(
        'Followers Component WillReceiveProps',
        name,
        newName
      );
      this.props.request(newName);
    }
  }

  render() {
    const {
      data,
      error,
      isFetched,
      isFetching
    } = this.props;

    if (error !== null) {
      return (
        <div className="wrapper">
          <p style={{ color: 'red' }}>Error! {error}</p>
        </div>
      );
    }

    return (
      <div className="wrapper">
        <h2>Followers</h2>
        {isFetching && <Spinner size="64px" color="cyan" gap={5} />}
        {isFetched && (
          <div className="followers__grid">
            {Object.values(data).map(follower => (
              <Follower
                key={follower.id}
                login={follower.login}
                avatar={follower.avatar_url}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: getData(state),
  error: getError(state),
  isFetched: getIsFetched(state),
  isFetching: getIsFetching(state)
});

const mapDispatchToProps = {
  request
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Followers
);
