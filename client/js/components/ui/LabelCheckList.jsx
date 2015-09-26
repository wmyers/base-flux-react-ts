'use strict';

import React from 'react';
import CheckList from './CheckList';

class LabelCheckList extends React.Component {
	render() {
		return (
			<div>
				<div className="list-item field-item align-top">
					<label className="item-inner">
						<div className="field-label">
							{this.props.label}
						</div>
					</label>
				</div>
				<div>
					<CheckList
						options = {this.props.options}
						updateParent = {this.props.updateParent}
						allOptions = {this.props.allOptions}
					/>
				</div>
			</div>
		)
	}
}

export default LabelCheckList;
