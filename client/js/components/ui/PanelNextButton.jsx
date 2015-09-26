import React from 'react';
import Tappable from 'react-tappable';
import RouterStore from '../../stores/RouterStore';
import classnames from 'classnames';

/*
Goes to the next transition path with a customizable transition animation
*/

class PanelNextButton extends React.Component {

  constructor(props){
    super(props);
  }

  next(e){
    e.target && e.preventDefault();
    RouterStore.storeNextTransitionKey(this.props.transitionKey || 'show-from-right');
    this.context.router.transitionTo(this.props.nextPath);
  }

  render() {

    const rightChevronStyle = {
      display: 'inline',
      paddingLeft: '5px'
    };

    var classNameStr = classnames(this.props.className, {
			'panel':true,
		});

    return (
      <div className={classNameStr}>
        <Tappable onTap={this.next.bind(this)} className="panel-button primary-inv" component="button">
          {this.props.nextLabel}
          <span className="ion-chevron-right" style={rightChevronStyle}/>
        </Tappable>
      </div>
    );
  }
}

PanelNextButton.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default PanelNextButton
