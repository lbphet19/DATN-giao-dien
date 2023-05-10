const axios = require('axios').default
const myAxiosInstance = require('./axios.js')

class HTTP{
    instance = axios.create({
        baseURL: `${process.env.SERVER_DOMAIN}/api/v2`
        // baseURL: 'https://jsonplaceholder.typicode.com/'
    })
    
    async get(endpoint, params){
        return myAxiosInstance.get(endpoint, {
            params: params,
            validateStatus: function (status) {
              return status < 500; // Resolve only if the status code is less than 500
            } 
          })
    }
    async post(endpoint, body){
        return myAxiosInstance.post(endpoint, body)
    }

}

module.exports = new HTTP