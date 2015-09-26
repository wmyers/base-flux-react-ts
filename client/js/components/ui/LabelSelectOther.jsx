'use strict';

import React from 'react';
import ReactMixin from 'react-mixin';
import { UI } from 'touchstonejs';
import FormMixin from '../../mixins/FormMixin';
import ModalMixin from '../../mixins/ModalMixin';

class LabelSelectOther extends React.Component {

  //TODO check the invocation of context in the child state
  //would be better to pass a binded function from the parent to this component

  render() {
    let context = this.props.context;
    let id = this.props.id;
    let label = this.props.label;

		return (
			<div>
        <UI.LabelSelect
          label={label}
          ref={id}
          value={context.state[id]}
          onChange={this.curryHandleValueChange(context, id)}
          options={this.props.options}
        />
        {context.state[id] === 'Other' &&
          <UI.Input
            placeholder={`Other ${label}`}
            valueLink={context.linkState(id+'Other')}
          />
        }
			</div>
		);
	}
}

ReactMixin(LabelSelectOther.prototype, ModalMixin);
ReactMixin(LabelSelectOther.prototype, FormMixin);

export default LabelSelectOther;
