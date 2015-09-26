import React from 'react';
import { Link } from 'react-router';
import UIActionCreators from '../../actions/UIActionCreators';
import RouterStore from '../../stores/RouterStore';

export default class SimpleList extends React.Component {

  //NB: cannot initiate transition  with router from this method without causing an error
  //is related to the existence or absence or undefined state of the 'to' param in the Link
  //strangely does not seem to affect non-repeated items without 'key properties'
  itemClick(){
    //store list item data
    UIActionCreators.simpleListItemRequest(this.props.store);
    //store transition
    RouterStore.storeNextTransitionKey(this.props.transitionKey || 'show-from-right');
  }

  render() {
    // {itemLabelList, ...others} = this.props;
    //...others props
    // - itemRoute
    // - store
    // - transitionKey
    //TODO store shortid if id already exists


    let item = (itemLabel, i) => {
      return (
        <Link
          onClick={this.itemClick.bind(this)}
          to={`${this.props.itemRoute}/${i}`}
          className="list-item is-tappable"
          component="div"
          key={'item-'+i}>
            <div className="item-inner">
              <div className="item-title">{itemLabel}</div>
            </div>
        </Link>
      );
    }

    return (
      <div>
        <div className="panel panel--first">
          {this.props.itemLabelList.map(item)}
        </div>
      </div>
    );
  }
}

SimpleList.contextTypes = {
  router: React.PropTypes.object.isRequired
};
