'use strict';

import React from 'react';
import ReactMixin from 'react-mixin';
import { UI } from 'touchstonejs';
import FormMixin from '../../mixins/FormMixin';
import ModalMixin from '../../mixins/ModalMixin';
import CollectionList from './CollectionList';

class LabelSelectCollection extends React.Component {

  //TODO check the invocation of context in the child state
  //would be better to pass a binded function from the parent to this component

  // manually update <select> back to 'Please select' (value = '')
  componentDidUpdate(){
    let context = this.props.context;
    let id = this.props.id;
    let node = React.findDOMNode(this.refs[id].refs.select);
    node.value = '';
  }

  render() {
    let context = this.props.context;
    let id = this.props.id;

    let selectStyle = {
      borderBottom: '0'
    }

		return (
			<div>
        <UI.LabelSelect
          style={selectStyle}
          label={this.props.label}
          ref={id}
          onChange={this.curryHandleCollectionChange(context, id)}
          options={this.props.options}
        />
        <CollectionList collection={context.state[id]} />
			</div>
		);
	}
}

ReactMixin(LabelSelectCollection.prototype, ModalMixin);
ReactMixin(LabelSelectCollection.prototype, FormMixin);

export default LabelSelectCollection;
