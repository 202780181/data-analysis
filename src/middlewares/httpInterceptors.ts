import { message } from 'antd';
import cookie from 'react-cookies';
import { history } from '@@/core/history';

const loginPath = '/user/login';

// 拦截器-请求前拦截
const RequestInterceptor = (url: string, options: any) => {
  const o = options;
  // 如果不是登陆页 headers里添加 username
  // headers 里面的内容是和后端协商好的
  o.headers = {
    ...options.headers,
    Authorization: (cookie?.load('token') && 'Bearer ' + cookie?.load('token')) || undefined,
  };
  if (o.headers.Authorization === undefined) {
    delete o.headers['Authorization'];
  }
  return {
    options: o,
  };
};

// 拦截器-响应后拦截
const ResponseInterceptors = async (response: Response): Promise<any> => {
  const res = await response.clone().json();
  if (res?.code) {
    if (res.code == 200) {
      return res;
    } else if (res.code == 401) {
      if (history.location.pathname !== loginPath) {
        cookie.remove('token');
        history.push(loginPath);
      }
    } else {
      message.error(res.msg || 'Error');
    }
  }
  return response;
};

// 错误请求
const errorHandler = (err: Error) => {
  console.error(err);
};

export { errorHandler, RequestInterceptor, ResponseInterceptors };
