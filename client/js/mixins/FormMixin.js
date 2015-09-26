'use strict';

/**
 * A mixin for binded, curried handlers for form input components in React Components
 */
var FormMixin = {

  curryHandleValueChange: (context, valueName) => {
    return (value) => {
      let s = {};
      s[valueName] = value;
      context.setState(s);
    }
	},

  curryHandleCollectionChange: (context, collectionName) => {
    let collection = context.state[collectionName];
    return (item) => {
      //remove if already selected, otherwise add
      let index = collection.indexOf(item);
      if(index > -1){
        collection.splice(index, 1);
      }else{
        if(collection.indexOf('All') > -1){
          return;
        }
        if(item === 'All'){
          //clear
          collection.length = 0;
        }
        if(item){
          collection.push(item);
        }
      }

      let s = {};
      s[collectionName] = collection;
  		context.setState(s);
    }
	}

};

module.exports = FormMixin;
