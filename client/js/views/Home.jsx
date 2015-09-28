import React from "react";
import AuthenticatedView from "./AuthenticatedView";
import { UI } from "touchstonejs";
import PanelNextButton from "../components/ui/PanelNextButton";

import LoginStore from "../stores/LoginStore";

import ReactMixin from "react-mixin";
import ModalMixin from "../mixins/ModalMixin";

class Home extends React.Component {

  render() {

    const user = this.props.user;
    const avatarURL = user.fbPicture || user.gravatar + "?s=400&d=retro&r=g";
    const imgStyle = {
      display: "block",
      margin: "40px auto",
      borderRadius: "50%",
      width: "200px",
      height: "200px"
    };

    return (

      <UI.ViewContent grow scrollable>
        <div className="panel-header u-text-truncate text-xl">
          {this.props.user.name}
        </div>
        <img src={avatarURL} style={imgStyle}/>
      </UI.ViewContent>
    );
  }
}

ReactMixin(Home.prototype, ModalMixin);

export default AuthenticatedView(Home);
