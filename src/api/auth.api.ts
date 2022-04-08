import { IUserData } from "types/IUserData";
import axios from 'axios';
import config from 'config';
import { ILoginApi } from "./types";

const BASE_URL = config.BASE_URL;

export function createUserApi(userData: IUserData) {
  return axios.post(BASE_URL + '/api/registration', userData);
}

export function loginApi(userData: ILoginApi) {
  return axios.post(BASE_URL + '/api/login', userData);
}