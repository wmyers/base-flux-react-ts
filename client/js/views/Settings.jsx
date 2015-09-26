import React from 'react';
import AuthenticatedView from './AuthenticatedView';
import LoginActionCreators from '../actions/LoginActionCreators';
import Tappable from 'react-tappable';
import { UI } from 'touchstonejs';
import PanelNextButton from '../components/ui/PanelNextButton';

export default AuthenticatedView(class Settings extends React.Component {

  componentWillMount(){
    this.state = {
      employee:EmployeeStore.employee,
      employer:EmployerStore.employer
    };
  }

  //action
  logout(e) {
    e.target && e.preventDefault();
    LoginActionCreators.logoutUser();
  }

  gotoGravatar(e){
    e.target && e.preventDefault();
    window.location = 'http://en.gravatar.com/emails/';
  }

  render() {
    let user = this.props.user;

    return (
      <UI.ViewContent grow scrollable>
        <div className="panel form-fields">
					<Tappable onTap={this.gotoGravatar.bind(this)} className="panel-button primary-inv" component="button">
						Set your Gravatar
					</Tappable>
        </div>
        <div className="panel form-fields">
					<Tappable onTap={this.logout.bind(this)} className="panel-button primary-inv" component="button">
						Logout
					</Tappable>
				</div>
      </UI.ViewContent>
    );
  }
});
