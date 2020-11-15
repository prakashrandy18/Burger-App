import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as actionCreators from "./../../../store/actions/Index";
import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actionCreators.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
