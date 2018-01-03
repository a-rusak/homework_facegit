import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { request } from '../../actions/followers';
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
        {isFetching && <p>loading…</p>}
        {isFetched && (
          <div className="followers__grid">
            {data.map(follower => (
              <Follower
                key={follower.id}
                login={follower.login}
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
