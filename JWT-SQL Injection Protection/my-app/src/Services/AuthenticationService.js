import {AxiosWithHeader} from "./AxiosWithHeader"

export default class AuthenticationService {

    static getUserJWT(){
        return localStorage.getItem("userJWT");
    }

    static setUserJWT(userJWT){
        localStorage.setItem("userJWT" , userJWT);
    }

    static getAuthenticationHeader() {
        return "Bearer " + this.getUserJWT();
    }

    static signup(signUpInfo) {
        return AxiosWithHeader.post("http://localhost:8080/authentication/signup", signUpInfo);
    }

    static login(loginInfo) {
        return AxiosWithHeader.post("http://localhost:8080/authentication/login", loginInfo);
    }

    static sendForgetPasswordEmail(forgotPasswordInfo){
        return AxiosWithHeader.post("http://localhost:8080/authentication/resetPassword" , forgotPasswordInfo);
    }

    static logout() {
        localStorage.removeItem("userJWT");
    }

}