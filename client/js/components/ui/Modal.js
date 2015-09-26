'use strict';

import React from 'react';
import Tappable from 'react-tappable';
import ModalStore from '../../stores/ModalStore';
import UIActionCreators from '../../actions/UIActionCreators';
import { UI } from 'touchstonejs';

class Modal extends React.Component {
	constructor(){
		super();
		this.state = {
			isShown:false
		}
	}

	onOK(){
		this.state.modalFunc && this.state.modalFunc();
		UIActionCreators.hideModal();
	}

	onCancel(){
		UIActionCreators.hideModal();
	}

	componentDidMount() {
    this.changeListener = this._onModalChange.bind(this);
    ModalStore.addChangeListener(this.changeListener);
  }

	_onModalChange(){
    this.setState({
      ...ModalStore.modalData
    });
  }

  componentWillUnmount() {
    ModalStore.removeChangeListener(this.changeListener);
  }

	render() {

		let displayStyle = {
			display: this.state.isShown ? 'block' : 'none'
		}

		return (
				<div style={displayStyle}>
					<div className="Modal-backdrop"/>
					<div className="Modal-dialog default">
						<div className="panel-header text-lg">
							{this.state.modalTitle}
	          </div>
						<div className="panel">
							{
								this.state.modalType === 'alert' && this.state.modalMessage
							}
							{
								this.state.modalType === 'message' &&
								<UI.Textarea disabled className="text-left text-xs" value={this.state.modalMessage} rows={8}/>
							}
						</div>
						<Tappable onTap={this.onOK.bind(this)} className="panel-button primary" component="button">
							OK
						</Tappable>
						{
							this.state.modalCancel &&
							<Tappable onTap={this.onCancel.bind(this)} className="panel-button primary" component="button">
								Cancel
							</Tappable>
						}
					</div>
				</div>
		);
	}
}

export default Modal;
