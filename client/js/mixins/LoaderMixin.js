var LoaderMixin = {

  showLoadingSpinner(isShown){
    require('../stores/UIActionCreators').showLoadingSpinner(isShown);
  }
}

export default LoaderMixin;
