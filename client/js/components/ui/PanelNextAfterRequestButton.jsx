import React from 'react';
import Tappable from 'react-tappable';
import RouterStore from '../../stores/RouterStore';
import observeStore from '../../utils/observeStore';
import AbstractStore from '../../stores/AbstractStore';

/*
Goes to the next transition path with a customizable transition animation,
AFTER an async request has responded successfully.
Requires 'requestPending' and 'error' props to be implemented in the store
*/

class PanelNextAfterRequestButton extends React.Component {

  constructor(props){
    super(props);
  }

  next(e){
    e.target && e.preventDefault();

    //call the passed in request function
    this.props.requestFunc();
    //observe store here
    let store = this.props.store;
    observeStore(store, (s) => !s.requestPending)
    .then(() => {
      if (!!store.error === false) {
        RouterStore.storeNextTransitionKey(this.props.transitionKey || 'show-from-right');
        this.context.router.transitionTo(this.props.nextPath);
      }
    });
  }

  render() {

    const rightChevronStyle = {
      display: 'inline',
      paddingLeft: '5px'
    };

    return (
      <div className="panel">
        <Tappable onTap={this.next.bind(this)} className="panel-button primary-inv" component="button">
          {this.props.nextLabel || 'Next'}
          <span className="ion-chevron-right" style={rightChevronStyle}/>
        </Tappable>
      </div>
    );
  }
}

PanelNextAfterRequestButton.contextTypes = {
  router: React.PropTypes.object.isRequired
};

PanelNextAfterRequestButton.AbstractAuthenticatedView = {
  nextPath: React.PropTypes.string.isRequired,
  transitionKey: React.PropTypes.string,
  nextLabel: React.PropTypes.string,
  store: React.PropTypes.instanceOf(AbstractStore).isRequired,
  requestFunc: React.PropTypes.func.isRequired
};

export default PanelNextAfterRequestButton
