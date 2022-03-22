import {message} from 'antd';

//拦截器-请求前拦截
const RequestInterceptor = (url: string, options: any) => {
  const o = options;
  //如果不是登陆页 headers里添加 username
  //headers 里面的内容是和后端协商好的
  o.headers = {
    // ...options.headers,
    'token': 'NjY4MjkwMGMwZWRiYmRkODViNjBi',
    'username': localStorage.getItem('userToken'),
  };
  return {
    options: o
  }
}


//拦截器-响应后拦截
const ResponseInterceptors = async (response: any) => {
  const res = await response.clone().json();
  if(res?.result) {
    const {sacpresult,sucess} = res.result;
    if(sucess) {
      return sacpresult;
    } else {
      message.error(res.result.sacpinfo || 'Error')
    }
  }
  return response
};


// 错误请求
const errorHandler = (err: Error) => {
  console.error(err)
}

export {
  errorHandler,
  RequestInterceptor,
  ResponseInterceptors
}



