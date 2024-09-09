import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:3003',
    timeout: 5000
});

// set request interceptor
request.interceptors.request.use((req) => {
   //config the request intercept
   
    return req;
});


// set response interceptor
request.interceptors.response.use((res) => {
    //config the response

    return res;
}, (err)=>{
    return Promise.reject(err);
});

export default request;