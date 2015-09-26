'use strict';

import React from 'react';
import ReactMixin from 'react-mixin';
import { UI } from 'touchstonejs';
import _ from 'lodash';
import ModalMixin from '../../mixins/ModalMixin';

class CheckList extends React.Component {

  componentWillMount() {

    //get a simple string array of the state options
    let options, option_strings = this.props.options.map(op => {return op.label || op});

    //if passing a full options list then display all options with only the state options ticked
    let allOptions = this.props.allOptions;
    if(allOptions && allOptions.length > option_strings.length){
      options = allOptions.map(op => {
        let label = op.label || op;
        if(option_strings.indexOf(label) > -1){
          return {label, selected:true}
        }
        return {label, selected:false}
      });
    }else{
      options = option_strings.map(op => {return {label:op, selected:true}});
    }

    this.setState({options});
  }

  _handleCheckListChange(index){
    //update this state
    let options = this.state.options;
    options[index].selected = !options[index].selected;
    this.setState({options});

    //update parent state with a plain label list
    this.props.updateParent(this._getSelectedLabelList(options));
  }

  _getSelectedLabelList(options){
    return _.pluck(_.filter(options, (op) => {return op.selected === true}), 'label');
  }

  render() {
		return (
      <UI.CheckList
          onChange={this._handleCheckListChange.bind(this)}
          options={this.state.options} />
		);
	}
}

CheckList.propTypes = {
  options: React.PropTypes.array,
  updateParent: React.PropTypes.func,
  allOptions: React.PropTypes.array,
};

ReactMixin(CheckList.prototype, ModalMixin);

export default CheckList;
