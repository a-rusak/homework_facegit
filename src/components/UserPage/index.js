import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { request } from '../../actions/users';
import {
  getName,
  getToken,
  getIsAuthorized
} from '../../reducers/auth';
import {
  getData,
  getIsFetched,
  getIsFetching,
  getError
} from '../../reducers/users';
import Followers from '../Followers';
import './user-page.css';

class UserPage extends PureComponent {
  componentDidMount() {
    this.props.request();
  }
  componentWillReceiveProps(newProps) {
    const name = this.props.match.params.name;
    const newName = newProps.match.params.name;
    if (name !== newName) {
      console.log(
        'User Page WillReceiveProps',
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
          <p style={{ color: 'red' }}>Ошибка! {error}</p>
        </div>
      );
    }

    return (
      <div className="wrapper">
        {isFetching && <h1>Идет загрузка</h1>}
        {isFetched && (
          <div className="user__grid">
            <header className="user__header">
              <h1>{data.name}</h1>
            </header>
            <img
              className="user__photo"
              src={data.avatar_url}
              alt=""
            />
            <section className="user__details">
              <dl>
                <dt>Nickname:</dt>
                <dd>{data.login}</dd>
              </dl>
              <dl>
                <dt>Followers:</dt>
                <dd>{data.followers}</dd>
              </dl>
              <dl>
                <dt>Public repos:</dt>
                <dd>{data.public_repos}</dd>
              </dl>
            </section>
          </div>
        )}
        <Followers />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: getName(state),
  token: getToken(state),
  isAuthorized: getIsAuthorized(state),
  data: getData(state),
  error: getError(state),
  isFetched: getIsFetched(state),
  isFetching: getIsFetching(state)
});

const mapDispatchToProps = {
  request
};

export default connect(mapStateToProps, mapDispatchToProps)(
  UserPage
);
