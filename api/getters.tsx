// Type: API
import axios from "axios";
const BASE_URL = "https://api.commadotai.com/";
const API_KEY = process.env.COMMA_KEY;
export async function getAccount() {
  try {
    const response = await axios.get(`${BASE_URL}v1/me/`, {
      headers: {
        Authorization: `JWT ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
export async function getDevice() {
  try {
    const response = await axios.get(`${BASE_URL}v1/me/devices/`, {
      headers: {
        Authorization: `JWT ${API_KEY}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
export async function getDeviceStats(dongleID: string) {
  try {
    const response = await axios.get(
      `${BASE_URL}v1.1/devices/${dongleID}/stats`,
      {
        headers: {
          Authorization: `JWT ${API_KEY}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
export async function getSegments(dongleID: string, limit = 3) {
  try {
    const response = await axios.get(
      `${BASE_URL}v1/devices/${dongleID}/routes_segments?limit=${limit}`,
      {
        headers: {
          Authorization: `JWT ${API_KEY}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
