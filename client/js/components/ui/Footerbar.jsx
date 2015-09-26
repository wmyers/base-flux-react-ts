import React from 'react';
import { UI } from 'touchstonejs';
import { Link } from 'react-router';
import RouterStore from '../../stores/RouterStore';

class Footerbar extends React.Component {

  constructor(props){
    super(props);
  }

  goBack(e){
    e.target && e.preventDefault();
    //notify the RouterStore that you are going back
    RouterStore.goBack();
    RouterStore.storeNextTransitionKey(this.props.transitionKey || 'show-from-left');

    if(RouterStore.pathHistoryLength > 2){
      this.context.router.goBack();
    }else{
      this.context.router.transitionTo('/home');
    }
  }

  goHome(e){
    e.target && e.preventDefault();
    RouterStore.storeNextTransitionKey(this.props.transitionKey || 'show-from-left');
    this.context.router.transitionTo('/home');
  }

  goSettings(e){
    e.target && e.preventDefault();
    RouterStore.storeNextTransitionKey(this.props.transitionKey || 'show-from-left');
    this.context.router.transitionTo('/settings');
  }

  //hack to deal with unused [Navigation] mixin in FooterbarButton
  getChildContext() {
    return { app: {} };
  }

  render() {
    return (
      <UI.Footerbar type="default">
        <UI.FooterbarButton label="Back" icon="ion-ios7-arrow-left" onTap={this.goBack.bind(this)}/>
        <UI.FooterbarButton label="Home" icon="ion-ios7-home-outline" onTap={this.goHome.bind(this)}/>
        <UI.FooterbarButton label="Settings" icon="ion-ios7-settings" onTap={this.goSettings.bind(this)}/>
      </UI.Footerbar>
    );
  }
}

export default Footerbar;

Footerbar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

//hack to deal with unused [Navigation] mixin in FooterbarButton
Footerbar.childContextTypes = {
  app: React.PropTypes.object.isRequired
};
