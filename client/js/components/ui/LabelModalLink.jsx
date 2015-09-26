'use strict';

/**
 A component to display a single read-only labelled item (string) which is a hyperlink
 to launch a modal with a full description of the labelled item
*/

import React from 'react';
import ReactMixin from 'react-mixin';
import { UI } from 'touchstonejs';
import ModalMixin from '../../mixins/ModalMixin';

class LabelModalLink extends React.Component {

  showModal(){
    // this.showModalMessage(this.props.value, this.props.description);
    this.showModalMessage(this.props.value, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
  }

  render() {
		return (
      <div>
        <UI.LabelLink readOnly
          label={this.props.label}
          value={this.props.value}
          component="span"
          icon="ion-ios7-information-outline"
          onTap={this.showModal.bind(this)}
          />
      </div>
		);
	}
}

ReactMixin(LabelModalLink.prototype, ModalMixin);

export default LabelModalLink;
