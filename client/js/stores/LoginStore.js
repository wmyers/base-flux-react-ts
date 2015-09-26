import ActionTypes from '../constants/ActionTypes';
import AbstractRequestStore from './AbstractRequestStore';
import LoginActionCreators from '../actions/LoginActionCreators'


class LoginStore extends AbstractRequestStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._user = null;
    this._error = null;
    this._jwt = null;
    this._isLoggingIn = false;

    //attempt auto-login
    this._autoLogin();
  }

  _registerToActions(action) {
    switch(action.type) {

      case ActionTypes.REQUEST_LOGIN_USER:
        this._error = null;
        this.isLoggingIn = true;
        break;

      case ActionTypes.REQUEST_LOGIN_USER_SUCCESS:
        this._setToken(action.body.token);
        this._getUserData();
        break;

      case ActionTypes.REQUEST_LOGIN_USER_ERROR:
        this._error = action.error;
        this._clean();
        this.emitChange();
        break;

      case ActionTypes.LOGOUT_USER:
        this._error = null;
        this._clean();
        this.emitChange();
        break;

      case ActionTypes.REQUEST_USER_DATA:
        this._error = null;
        this.isLoggingIn = true;
        break;

      case ActionTypes.REQUEST_USER_DATA_SUCCESS:
        this._user = action.body.user;
        this.isLoggingIn = false;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_USER_DATA_ERROR:
        this._error = action.error;
        this._clean();
        this.isLoggingIn = false;
        this.emitChange();
        break;

      //when an employee is created the user is updated too
      case ActionTypes.REQUEST_REGISTER_EMPLOYEE_DATA_SUCCESS:
        if(action.body.user){
          this._user = action.body.user;
        }
        this.emitChange();
        break;

      //when an employer is created the user is updated too
      case ActionTypes.REQUEST_REGISTER_EMPLOYER_DATA_SUCCESS:
        if(action.body.user){
          this._user = action.body.user;
        }
        this.emitChange();
        break;

      default:
        break;
    }
  }

  _autoLogin () {
    let jwt = localStorage.getItem('jv_jwt');
    if (jwt) {
      this._setToken(jwt);
      this._getUserData();
    }
  }

  _getUserData () {
    setTimeout(() => {
      LoginActionCreators.getUserData(this._jwt);
    }, 1);
  }

  _setToken (token) {
    this._jwt = token;
    localStorage.setItem('jv_jwt', this._jwt);
  }

  _clean () {
    this._user = null;
    this._jwt = null;
    localStorage.setItem('jv_jwt', '');
  }

  get user() {
    return this._user;
  }

  get error() {
    return this._error;
  }

  get jwt() {
    return this._jwt;
  }

  get isLoggingIn() {
    return this._isLoggingIn;
  }

  set isLoggingIn(bool){
    this._isLoggingIn = bool;

    //bind requestPending state to isLoggingIn state
    this.requestPending = bool;
  }

  isLoggedIn() {
    return !!this._user;
  }

}

export default new LoginStore();
