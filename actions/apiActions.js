import { apiRequest } from '../services/api';

export const fetchData = (url, method, data, successAction, failureAction) => {
  return (dispatch) => {
    dispatch({ type: 'API_REQUEST' });

    apiRequest(url, method, data)
      .then((response) => {
        dispatch({ type: successAction, payload: response });
      })
      .catch((error) => {
        dispatch({ type: failureAction, payload: error });
      });
  };
};
