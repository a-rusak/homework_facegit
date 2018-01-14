import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class Follower extends PureComponent {
  render() {
    const { login, avatar } = this.props;

    return (
      <div className="follower">
        <img src={avatar} style={{width: `100%`}} alt=""/>
        <h3>
          <Link to={`/user/${login}`}>{login}</Link>
        </h3>
      </div>
    );
  }
}

export default Follower;
