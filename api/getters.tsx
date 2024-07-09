// Type: API
import axios from "axios";
const BASE_URL = "https://api.commadotai.com/";
const API_KEY = process.env.COMMA_KEY;
export async function getAccount() {
  try {
    console.log(API_KEY);
    const response = await axios.get(`${BASE_URL}v1/me/`, {
      headers: {
        Authorization: `JWT ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}
export async function getDevice() {
  try {
    console.log(API_KEY);
    const response = await axios.get(`${BASE_URL}v1/me/devices/`, {
      headers: {
        Authorization: `JWT ${API_KEY}`,
      },
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}
