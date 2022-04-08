import axios from "axios";
import config from "config";
import { editData, ICreateContactApi } from "./types";

const BASE_URL = config.BASE_URL;

export function createContactApi(
  contactData: ICreateContactApi,
  token: string
) {
  return axios.post(BASE_URL + '/api/createContact', contactData, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}

export function getContactsApi(id: string, token: string) {
  return axios.get(BASE_URL + '/api/getContacts', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      id,
    }
  });
}

export function deleteContactApi(id: string, token: string) {
  return axios.post(BASE_URL + '/api/deleteContact', { id }, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}

export function editContactApi(id: string, token: string, data: editData) {
  return axios.post(BASE_URL + '/api/editContact', { id, data }, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}