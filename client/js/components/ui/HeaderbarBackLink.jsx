import React from 'react';
import { UI } from 'touchstonejs';
import { Link } from 'react-router';
import RouterStore from '../../stores/RouterStore';

class HeaderbarBackLink extends React.Component {

  constructor(props){
    super(props);
  }

  click(e){
    e.target && e.preventDefault();
    //notify the RouterStore that you are going back
    RouterStore.goBack();
    RouterStore.storeNextTransitionKey(this.props.transitionKey || 'show-from-left');

    if(RouterStore.pathHistoryLength > 2){
      this.context.router.goBack();
    }else{
      this.context.router.transitionTo(this.props.linkPath || '/home');
    }
  }

  render() {

    return (
      <UI.Headerbar type="default" label={this.props.headerbarLabel}>
        <Link onClick={this.click.bind(this)} to=""
          className="Headerbar-button ion-chevron-left" component="button">
          Back
        </Link>
      </UI.Headerbar>
    );
  }
}

export default HeaderbarBackLink;

HeaderbarBackLink.contextTypes = {
  router: React.PropTypes.object.isRequired
};
