import {request} from "./request";
import {Authentication} from "../models/response_model";

export function userLogin(userName, password) {
  return request({
    method: 'post',
    url: '/users/login',
    data: {
      userName: userName,
      secret: password,
    }
  })
}

export function userRegister(userName, userEmail, userPassword) {
  return request({
    method: 'post',
    url: '/users/register',
    data: {
      userName: userName,
      userEmail: userEmail,
      secret: userPassword,
    }
  })
}

export function checkToken() {
  return request({
    method: 'get',
    url: '/users/token',
    auth: {username: Authentication.getToken()}
  })
}