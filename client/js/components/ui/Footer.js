'use strict';

import React from 'react/addons';
import { UI } from 'touchstonejs';

module.exports = React.createClass({
	displayName: 'Footer',
	AbstractAuthenticatedView: {
		className: React.PropTypes.string,
		height: React.PropTypes.string
	},
	render: function render() {

		return React.createElement(
			UI.ViewContent,
			{height: this.props.height, className: this.props.className },
			this.props.children
		);
	}
});
