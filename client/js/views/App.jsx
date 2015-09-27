import React, { cloneElement } from 'react/addons';

import LoginStore from '../stores/LoginStore';
import RouterStore from '../stores/RouterStore';
import ModalStore from '../stores/ModalStore';
import LoginActionCreators from '../actions/LoginActionCreators';
import classnames from 'classnames';

import Modal from '../components/ui/Modal'
import LoadingSpinner from '../components/ui/LoadingSpinner'


const { CSSTransitionGroup } = React.addons;

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  //forces the default URL to home page or login
  static onEnter(nextState, transition) {
    if(nextState.location.pathname === '/'){
      transition.to('/home');
    }
  }

  componentDidMount() {
    //register change listener with LoginStore
    this.changeListener = this._onLoginChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  }

  /*
    This event handler deals with all code-initiated routing transitions
    when logging in or logging out
  */
  _onLoginChange() {
    //get any activeTransitionPath
    let transitionPath = RouterStore.activeTransitionPath || '/home';

    //trigger router change
    if(LoginStore.isLoggedIn()){
      this.context.router.transitionTo(transitionPath);
    }else{
      this.context.router.transitionTo('/login');
    }
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {

    var appWrapperClassName = classnames({
      'app-wrapper': true,
      'is-native-app': false
    });

    var key = this.props.location.pathname;

    return (
      <div className={appWrapperClassName}>
        <div className="device-silhouette">
          <CSSTransitionGroup component="div" className="view-wrapper" transitionName={RouterStore.nextTransitionKey}>
            {cloneElement(this.props.children || <div/>, { key: key })}
            <LoadingSpinner/>
            <Modal/>
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }

}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default App;
