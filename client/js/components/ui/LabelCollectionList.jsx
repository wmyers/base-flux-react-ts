'use strict';

import React from 'react';

class LabelCollectionList extends React.Component {
	render() {

		let item = (itemText, index) => {return <li key={index}>{itemText}</li>;}

		let listStyle = {
			listStylePosition: 'inside',
			marginLeft: '0',
			paddingLeft: '0',
			marginTop: '0',
			paddingTop: '0'
		}

		return (
			<div>
				<div className="list-item field-item align-top">
					<label className="item-inner">
						<div className="field-label">
							{this.props.label}
						</div>
						<div className="field-control">
							<ul style={listStyle} >{this.props.collection.map(item)}</ul>
						</div>
					</label>
				</div>

			</div>
		)
	}
}

export default LabelCollectionList;
