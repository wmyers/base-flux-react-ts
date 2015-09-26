import React from 'react';
import { UI } from 'touchstonejs';
import { Link } from 'react-router';
import RouterStore from '../../stores/RouterStore';

class HeaderbarLink extends React.Component {

  constructor(props){
    super(props);
  }

  click(e){
    e.target && e.preventDefault();
    RouterStore.storeNextTransitionKey(this.props.transitionKey || 'show-from-left');
    this.context.router.transitionTo(this.props.linkPath);
  }

  render() {

    return (
      <UI.Headerbar type="default" label={this.props.headerbarLabel}>
        <Link onClick={this.click.bind(this)} to=""
          className="Headerbar-button ion-chevron-left" component="button">
          {this.props.linkLabel}
        </Link>
      </UI.Headerbar>
    );
  }
}

HeaderbarLink.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default HeaderbarLink
