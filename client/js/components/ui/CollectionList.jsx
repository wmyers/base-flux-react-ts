'use strict';

import React from 'react';

class CollectionList extends React.Component {
	render() {
    let item = (itemText, index) => {return <li key={index}>{itemText}</li>;}

		return (
      <div className="field-item list-item">
        <ul>{this.props.collection.map(item)}</ul>
      </div>
		);
	}
}

export default CollectionList;
