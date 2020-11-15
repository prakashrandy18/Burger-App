import React from "react";
import { withRouter } from "react-router-dom";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
  let transformIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      console.log(props.ingredients);
      console.log(igKey);
      console.log(props.ingredients[igKey]);
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        console.log(i);
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      console.log(arr);
      return arr.concat(el);
    }, []);
  if (transformIngredients.length === 0) {
    transformIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes["Burger"]}>
      <BurgerIngredient type="bread-top" />
      {transformIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);
