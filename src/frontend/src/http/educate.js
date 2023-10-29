import axios from "axios";

export const API_URL = "http://127.0.0.1:8080/api/";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
});


const getTests = async () => {
    const response = await $api.get("tests/")

    console.log(response)

    return response.data[0]
}

export { getTests };