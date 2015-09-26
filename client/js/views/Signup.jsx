import React from 'react';
import ReactMixin from 'react-mixin';
import ModalMixin from '../mixins/ModalMixin';
import LoginActionCreators from '../actions/LoginActionCreators';
import SignupStore from '../stores/SignupStore';
import Tappable from 'react-tappable';
import { UI } from 'touchstonejs';

class Signup extends React.Component {

  constructor() {
    super()
    this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			userType: '',
      error: null,
      confirmPassword: ''
    };
  }

  componentDidMount() {
    this.changeListener = this._onSignupChange.bind(this);
    SignupStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    SignupStore.removeChangeListener(this.changeListener);
  }

  _onSignupChange() {
    //either display any error or process the successfully returned token
    if(SignupStore.error){
      this.alertModalError(SignupStore.error);
    }else if(SignupStore.token){
      LoginActionCreators.loginSignup(SignupStore.token);
    }
  }

  handleUserTypeChange(userType){
    this.setState({userType});
  }

  //action
  signup(e) {
    e.target && e.preventDefault();

    //Validate
    let vals = ['firstName', 'lastName', 'email', 'password', 'userType', 'confirmPassword'], currVal;
    let isIncomplete = vals.some((val) => {
      currVal = val;
      return !!this.state[val] === false;
    })
    if(isIncomplete){
      this.alertModalError(`'${currVal}' is required`);
      return;
    }
    if(this.state.password !== this.state.confirmPassword){
      this.alertModalError('Passwords must match');
      return;
    }

    LoginActionCreators.signup(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.password,
      this.state.userType
    );
  }

  render() {

    const logoContainerStyle = {
      padding: '40px 0'
    };

    return (
			<UI.View>
				<UI.ViewContent grow scrollable >
					<div className="panel form-fields">
						<UI.LabelInput type="text" label="First name" placeholder="First name" valueLink={this.linkState('firstName')}/>
						<UI.LabelInput type="text" label="Last name" placeholder="Last name" valueLink={this.linkState('lastName')}/>
						<UI.LabelInput type="email" label="Email" placeholder="Email" valueLink={this.linkState('email')}/>
						<UI.LabelInput type="password" label="Password" placeholder="Password" valueLink={this.linkState('password')}/>
						<UI.LabelInput type="password" label="Confirm password" valueLink={this.linkState('confirmPassword')}/>
					</div>
          <div className="panel form-fields">
            <Tappable onTap={this.signup.bind(this)} className="panel-button primary" component="button">
							Register
						</Tappable>
          </div>
				</UI.ViewContent>
			</UI.View>
    );
  }
}

ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
ReactMixin(Signup.prototype, ModalMixin);

export default Signup;
