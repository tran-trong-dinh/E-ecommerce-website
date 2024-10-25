import axios from '../axios';

export const apiRegister = (data) =>
     axios({
          url: '/user/register',
          method: 'post',
          data,
          withCredentials: true,
     });
export const apiLogin = (data) =>
     axios({
          url: '/user/login',
          method: 'post',
          data,
     });
export const apiForgotPassword = (data) =>
     axios({
          url: '/user/forgot-password',
          method: 'post',
          data,
     });
export const apiResetPassword = (data) =>
     axios({
          url: '/user/reset-password',
          method: 'put',
          data,
     });
export const apiGetCurrentUser = () =>
     axios({
          url: '/user/current',
          method: 'get',
     });
export const apiGetUsers = (params) =>
     axios({
          url: '/user',
          method: 'get',
          params,
     });
export const apiUpdateUser = (data, uid) =>
     axios({
          url: `/user/${uid}`,
          method: 'put',
          data,
     });
export const apiDeleteUser = (uid) =>
     axios({
          url: `/user/${uid}`,
          method: 'delete',
     });
