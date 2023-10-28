import axios from "axios";

export const API_URL = "http://127.0.0.1:8000/api/";
export const API = "http://localhost:8000";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});


const login = async (email, password) => {
  try {
    const response = await $api.post('auth/token/login/', { email, password });
    const token = response.data.auth_token;

    localStorage.setItem('token', token);
    return response.status
  } catch (error) {
    console.error(error);
    return error
  }
};

const register = async (user) => {
  try {
    const response = await $api.post('auth/users/', user);
    return response.status
  } catch (error) {
    console.error(error);
  }
};

const getAuthenticatedRequest = async (url) => {
  try {
    const token = localStorage.getItem("token")

    if (!token) {
      return {}
    }

    const headers = {
      'Authorization': `Token ${token}`,
      'Content-Type' : 'application/json; charset=UTF-8'
    }

    const response = await $api.get(url, {
      headers
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return {}
  }
};

const checkAuth = async () => {
  const token = localStorage.getItem("token")

  if (!token) {
    return false
  }

  const response = await $api.get("users/")

  if (response.status !== 200) {
    localStorage.removeItem("token")
    return false
  }

  return true
}

const sendRequest = async (url, method = 'GET', data = null) => {
  try {
    const URL = API_URL + url

    const response = await axios({ URL, method, data });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async () => {
    const user = await getAuthenticatedRequest('auth/users/me/')
    return getAuthenticatedRequest(`users/${user.id}/`)
}

const getUserCompany = async () => {
  let user = await getUser()
  console.log(user)
  return await getAuthenticatedRequest(`company/${user.company}/`)
}

const logout = () => {
  localStorage.removeItem('token');
};

export { $api, login, register, getAuthenticatedRequest, sendRequest, logout, checkAuth, getUser, getUserCompany };
