import service from "./config.services";

//for POST "auth/signup"
const signupService = (newUser) => {
    return service.post("/auth/signup", newUser)
}

//for POST "auth/login"
const loginService = (userCredentials) => {
    return service.post('/auth/login', userCredentials)
}

//for GET "auth/verify"
const verifyService = () => {
    return service.get('/auth/verify')
}

export {
    signupService,
    loginService,
    verifyService
}