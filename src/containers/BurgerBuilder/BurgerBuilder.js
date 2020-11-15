import React, { Component } from "react";

import { connect } from "react-redux";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Auxillary/Auxillary";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "./../../hoc/WithErrorHandler/WithErrorHandler";
import * as actionCreators from "../../store/actions/Index";

// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7,
// };

class BurgerBuilder extends Component {
  //STATE...
  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchaseable: false,
    purchasing: false,
    // loading: false,
    // error: false,
  };

  componentDidMount = () => {
    this.props.onInitIngridents();
    // axios
    //   .get("https://react-my-burger-e094a.firebaseio.com/ingredients.json")
    //   .then((res) => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch((err) => {
    //     this.setState({ error: true });
    //   });
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  //HANDLERS...

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;

  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];

  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;

  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);

    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString,
    // });
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  //RENDER...

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    //{salad: true, meat: false}
    let burger = this.props.error ? (
      <p>Ingreident cant be loaded </p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCancelled={this.purchaseCancelHandler}
          price={this.props.price}
        />
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.state.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(actionCreators.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actionCreators.removeIngredient(ingName)),
    onInitIngridents: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actionCreators.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
