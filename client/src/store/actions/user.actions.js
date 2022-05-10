import axios from 'axios';

import { usersActions } from '../slices/user.slice';

const API_URL = '';

export const login = (accountNumber, password) => {
  return async (dispatch) => {
    try {
      axios.post(API_URL, accountNumber, password);
      dispatch(usersActions.login());
    } catch (error) {
      console.log(error);
    }
  };
};

export const signup = (name, password) => {
  return async (dispatch) => {
    try {
      // API REQUEST
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(usersActions.logout());
    } catch (error) {
      console.log(error);
    }
  };
};
