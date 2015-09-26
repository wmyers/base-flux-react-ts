'use strict';

/**
 A component to display a single read-only labelled item (string) which is a hyperlink
 to another page view in the application
*/

import React from 'react';
import ReactMixin from 'react-mixin';
import { UI } from 'touchstonejs';
import RouterStore from '../../stores/RouterStore';

class LabelNavLink extends React.Component {

  navToPath(e){
    e.target && e.preventDefault();
    RouterStore.storeNextTransitionKey(this.props.transitionKey || 'fade');
    this.context.router.transitionTo(this.props.linkPath);
  }

  render() {
		return (
      <div>
        <UI.LabelLink readOnly
          label={this.props.label}
          value={this.props.value}
          component="span"
          icon="ion-ios7-arrow-right"
          onTap={this.navToPath.bind(this)}
          />
      </div>
		);
	}
}

LabelNavLink.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default LabelNavLink;
