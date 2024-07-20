import axios from 'axios';
import { getToken } from '../utils/helper.js';
import toast from 'react-hot-toast';

async function makeRequest(method, url, data = {}) {
  try {
    const token = getToken();
    const response = await axios({
      method,
      url,
      data,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response;
  } catch (error) {
    toast.error(
      error.response.data.message || 'Something Went Wrong..!',
      'error'
    );
  }
}

export async function getRequest(url, data) {
  return makeRequest('get', url, data);
}

export async function postRequest(url, data) {
  return makeRequest('post', url, data);
}

export async function putRequest(url, data) {
  return makeRequest('put', url, data);
}

export async function patchRequest(url, data) {
  return makeRequest('patch', url, data);
}

export async function deleteRequest(url, data) {
  return makeRequest('delete', url, data);
}

export async function multiPartRequest(url, data) {
  const token = getToken();
  const respose = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return respose;
}
