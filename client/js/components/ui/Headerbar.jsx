import React from 'react';
import { UI } from 'touchstonejs';

class Headerbar extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    const iconPath = '../../../img/app-icon.png';

    const iconStyle = {
      width: '40px',
      height: '40px',
      position: 'absolute',
      top: '2px',
      left: '3px'
    };

    return (
      <UI.Headerbar type="default" label={this.props.headerbarLabel}>
        <img src={iconPath} style={iconStyle}/>
      </UI.Headerbar>
    );
  }
}

export default Headerbar;
