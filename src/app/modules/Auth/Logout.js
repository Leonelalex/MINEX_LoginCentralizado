import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {LayoutSplashScreen} from "../../../_metronic/layout";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem('SessionToken');
    localStorage.removeItem('user');
  }

  render() {
    const { hasAuthToken } = this.props;
    return hasAuthToken ? <LayoutSplashScreen /> : <Redirect to="/auth/login" />;
  }
}

//TODO set auth.actions
export default connect(
  ({ auth }) => ({ hasAuthToken: Boolean(auth.authToken) }),
  null
)(Logout);
