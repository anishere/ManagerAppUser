import axios from "axios";
const instance = axios.create({
    baseURL: 'https://reqres.in',
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //trả về obj có prop statusCode để biết api đã delete user hay chưa api sẽ trả về 204
    return response.data ? response.data : {statusCode : response.status}
    //Loại bỏ lớp data của axios và lấy trực tiếp data của api ta gọi
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //Khi error thì sẽ trả về 1 obj chứa data status headers
    let res = {}
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.data = error.response.data
      res.status = error.response.status
      res.headers = error.response.headers
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser 
      // and an instance of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    // return Promise.reject(error);
    return res
});

export default instance