import React from 'react';
import {Link, UI} from 'touchstonejs';

export default class SubHeader extends React.Component {

  constructor(props){
    super(props);
  }

  render() {

    const avatarURL = this.props.user.fbPicture || this.props.user.gravatar + '?s=80&d=retro&r=g';
    const avatarStyle = {
      borderRadius: '50%',
      display: 'inline',
      width: '40px',
      height: '40px',
      float: 'left'
    };

    const userNameStyle = {
      paddingLeft: '10px'
    };

    return (
        <div className="panel-header">
          <img src={avatarURL} style={avatarStyle}/>
          <span className="u-text-truncate text-xl" style={userNameStyle}>{this.props.user.name}</span>
          <div className="u-clearfix"/>
        </div>
    );
  }
}
