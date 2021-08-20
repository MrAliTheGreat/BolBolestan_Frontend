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
        return AxiosWithHeader.post("http://87.247.185.122:31007/authentication/signup", signUpInfo);
    }

    static login(loginInfo) {
        return AxiosWithHeader.post("http://87.247.185.122:31007/authentication/login", loginInfo);
    }

    static sendForgetPasswordEmail(forgotPasswordInfo){
        return AxiosWithHeader.post("http://87.247.185.122:31007/authentication/resetPassword" , forgotPasswordInfo);
    }

    static logout() {
        localStorage.removeItem("userJWT");
    }

}