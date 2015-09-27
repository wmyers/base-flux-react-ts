import React from "react";
import ReactMixin from "react-mixin";
import ModalMixin from "../mixins/ModalMixin";
import LoginActionCreators from "../actions/LoginActionCreators";
import LoginStore from "../stores/LoginStore";
import Tappable from "react-tappable";
import { UI } from "touchstonejs";
import PanelNextButton from "../components/ui/PanelNextButton";

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
			email: "",
			password: "",
    };
  }

  componentDidMount() {
    this.changeListener = this._onLoginChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  _onLoginChange() {
    //error handling
    if(LoginStore.error){
      this.alertModalError(LoginStore.error);
    }
  }

  //action
  login(e) {
    e.target && e.preventDefault();
    LoginActionCreators.loginUser(this.state.email, this.state.password);
  }

  fbLogin(e) {
    e.target && e.preventDefault();
    LoginActionCreators.loginFBUser();
  }

  render() {

    const pushBelowFoldStyle = {
      marginTop: "30px"
    };

    const fbLogoPath = "../../img/fb_logo.png";

    return (
      <UI.View>
  			<UI.ViewContent grow scrollable >

          {/*<div className="tout-circle-container">
            <div className="fb-circle"><span><img src={fbLogoPath}/></span></div>
          </div>

          <div className="panel form-fields">
            <Tappable onTap={this.fbLogin.bind(this)} className="panel-button primary" component="button">
             Start using with Facebook!
  					</Tappable>
          </div>*/}

          <div className="panel form-fields" style={pushBelowFoldStyle}>
  					<UI.LabelInput type="email" label="Email" placeholder="Email" valueLink={this.linkState("email")}/>
  					<UI.LabelInput type="password" label="Password" placeholder="Password" valueLink={this.linkState("password")}/>
            <Tappable onTap={this.login.bind(this)} className="panel-button primary" component="button">
  						Login
  					</Tappable>
  				</div>

          <div className="panel-btn-info">Not yet registered?</div>
          <PanelNextButton nextPath="signup" nextLabel="Register" />
  			</UI.ViewContent>
    </UI.View>
    );
  }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
ReactMixin(Login.prototype, ModalMixin);

export default Login;
