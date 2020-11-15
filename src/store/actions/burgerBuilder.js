import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

export const setIngredients = (ings) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ings,
  };
};

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://react-my-burger-e094a.firebaseio.com/ingredients.json")
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientFailed());
      });
  };
};
