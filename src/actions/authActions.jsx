import axios from '../axiosConfig'; 
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';

export const FETCH_USER_STATUS = 'FETCH_USER_STATUS';

export const fetchUserStatus = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/api/check-status');
    if (response.status >= 200 && response.status < 300) {
      dispatch({
        type: FETCH_USER_STATUS,
        payload: response.data.user, 
      });
    } else {
      throw new Error('Failed to fetch user status');
    }
  } catch (error) {
    console.error('Error checking authentication status:', error);
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/login', userData);
    if (response.status >= 200 && response.status < 300) {
      dispatch({
        type: LOGIN_USER,
        payload: response.data,
      });
      return response.data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/api/logout');
    if (response.status >= 200 && response.status < 300) {
      dispatch({ type: LOGOUT_USER });
      return response.data;
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    console.error('Error checking authentication status:', error);
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/register', userData);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
  }
};
