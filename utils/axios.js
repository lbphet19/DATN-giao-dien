const axios = require('axios').default
const myAxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v2',
    // timeout: 30000,
})

myAxiosInstance.interceptors.request.use(x => {

    const headers = {
        ...x.headers.common,
        ...x.headers[x.method],
        ...x.headers
    };

    ['common','get', 'post', 'head', 'put', 'patch', 'delete'].forEach(header => {
        delete headers[header]
    })
    let params = "?"
    for(let key in x.params){
        params += `${key}=${x.params[key]}&`
    }
    const printable = `${new Date()} | Request: ${x.method.toUpperCase()} | api/v2/${x.url}${params}`
    console.log(printable)

    return x;
})

/* myAxiosInstance.interceptors.response.use(x => {

    const printable = `${new Date()} | Response: ${x.status} | ${ JSON.stringify(x.data) }`
    console.log(printable)

    return x;
}) */


module.exports = myAxiosInstance