'use strict';

import React from 'react';
import ReactMixin from 'react-mixin';
import { UI } from 'touchstonejs';
import FormMixin from '../../mixins/FormMixin';
import ModalMixin from '../../mixins/ModalMixin';

class LabelSelect extends React.Component {

  //TODO check the invocation of context in the child state
  //would be better to pass a binded function from the parent to this component

  // manually update single-value <select> state props with ref
  componentDidUpdate(){
    let context = this.props.context;
    let id = this.props.id;
    let node = React.findDOMNode(this.refs[id].refs.select);
    node.value = context.state[id];
  }

  render() {
    let context = this.props.context;
    let id = this.props.id;

		return (
			<div>
        <UI.LabelSelect
          label={this.props.label}
          ref={id}
          value={context.state[id]}
          onChange={this.curryHandleValueChange(context, id)}
          options={this.props.options}
        />
			</div>
		);
	}
}

ReactMixin(LabelSelect.prototype, ModalMixin);
ReactMixin(LabelSelect.prototype, FormMixin);

export default LabelSelect;
