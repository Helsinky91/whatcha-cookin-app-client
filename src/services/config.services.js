import axios from "axios";

const service = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

//to get the TOKEN in each call to the BE
service.interceptors.request.use((config) => {
    
    //seach the Token that is stored in local storage
    const authToken = localStorage.getItem("authToken")

    const tokenFull = `Bearer ${authToken}` 

    //add the token to headers.authorization
    if(authToken) {
        config.headers.authorization = tokenFull
    }
    return config
 })

export default service