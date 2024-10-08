import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "./../../axios-orders";
import Order from "./../../components/Order/Order";
import withErrorHandler from "./../../hoc/WithErrorHandler/WithErrorHandler";
import * as actionCreators from "./../../store/actions/Index";
import Spinner from "./../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    // axios
    //   .get("/orders.json")
    //   .then((res) => {
    //     const fetchedOrders = [];
    //     for (let key in res.data) {
    //       fetchedOrders.push({
    //         ...res.data[key],
    //         id: key,
    //       });
    //     }
    //     this.setState({ loading: false, orders: fetchedOrders });
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false });
    //   });
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return orders;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actionCreators.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
