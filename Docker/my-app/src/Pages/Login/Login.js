import * as React from "react";
import "../../Assets/StylesCSS/LoginSignupCSS.css"
import { Redirect } from "react-router-dom";
import {hasDomain, hasNumberInString, isDateValid, isNumeric} from "../../Utilities/StringUtils";
import AuthenticationService from "../../Services/AuthenticationService";
import axios from "axios";

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            loading: false,

            signInEmail: null,
            signInPassword: null,

            name: null,
            secondName: null,
            studentId: null,
            birthDate: null,
            field: null,
            faculty: null,
            level: null,
            signUpEmail: null,
            signUpPassword: null,

            forgetPasswordEmail: null
        };
    }

    // handleReceive = async (event) => {
    //     if(this.state.username){
    //         this.setState({
    //             loading: true
    //         });
    //         const data = await fetch(`http://localhost:8080/login/${this.state.username}`);
    //         const foundStudent = await data.json();
    //         if(foundStudent.studentId){
    //             localStorage.setItem("onlineStudentID" , foundStudent.studentId)
    //             this.setState({
    //                 redirect: "/home"
    //             });
    //         }
    //         else{
    //             this.setState({
    //                 loading: false
    //             });
    //             {alert("ایمیل وارد شده پیدا نشد!")}
    //         }
    //     }
    //     else{
    //         {alert("لطفا ایمیل خود را وارد کنید!")}
    //     }
    // }

    setText(event){
        if(event.currentTarget.id === "name"){
            this.setState({name: event.target.value});
        }
        else if(event.currentTarget.id === "secondName"){
            this.setState({secondName: event.target.value});
        }
        else if(event.currentTarget.id === "studentId"){
            this.setState({studentId: event.target.value});
        }
        else if(event.currentTarget.id === "birthDate"){
            this.setState({birthDate: event.target.value});
        }
        else if(event.currentTarget.id === "field"){
            this.setState({field: event.target.value});
        }
        else if(event.currentTarget.id === "faculty"){
            this.setState({faculty: event.target.value});
        }
        else if(event.currentTarget.id === "level"){
            this.setState({level: event.target.value});
        }
        else if(event.currentTarget.id === "signUpEmail"){
            this.setState({signUpEmail: event.target.value});
        }
        else if(event.currentTarget.id === "signUpPassword"){
            this.setState({signUpPassword: event.target.value});
        }
        else if(event.currentTarget.id === "signInEmail"){
            this.setState({signInEmail: event.target.value});
        }
        else if(event.currentTarget.id === "signInPassword"){
            this.setState({signInPassword: event.target.value});
        }
        else if(event.currentTarget.id === "forgetPasswordEmail"){
            this.setState({forgetPasswordEmail : event.target.value});
        }
    }

    handleSignup = async (event) =>{
        if(this.state.name && this.state.secondName && this.state.studentId && this.state.birthDate &&
           this.state.field && this.state.faculty && this.state.level && this.state.signUpEmail && this.state.signUpPassword){

            if(hasNumberInString(this.state.name) || hasNumberInString(this.state.secondName) ||
                hasNumberInString(this.state.field) || hasNumberInString(this.state.faculty) ||
                hasNumberInString(this.state.level)){

                alert("خطا! در فیلدی که عدد نباید وجود داشته باشد عدد آمده است.")
                return;
            }

            if(!isNumeric(this.state.studentId)){
                alert("خطا! شماره دانشجویی باید عدد باشد.")
                return;
            }

            if(!isDateValid(this.state.birthDate)){
                alert("خطا! تاریخ تولد اشتباه وارد شده است. فرمت درست: yyyy/mm/dd")
                return;
            }

            if(!hasDomain(this.state.signUpEmail)){
                alert("خطا! دامنه ایمیل وارد نشده است.")
                return;
            }

            this.setState({
                loading: true
            });
            AuthenticationService.signup({
                name: this.state.name,
                secondName: this.state.secondName,
                studentId: this.state.studentId,
                birthDate: this.state.birthDate,
                field: this.state.field,
                faculty: this.state.faculty,
                level: this.state.level,
                signUpEmail: this.state.signUpEmail,
                signUpPassword: this.state.signUpPassword
            }).then(response => {
                let userJWT = response.data.slice(7 , response.data.length) // Remove Bearer
                AuthenticationService.setUserJWT(userJWT)
                this.setState({
                    redirect: "/home"
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
                alert("مشکلی در ثبت نام پیش آمده است " + error.response.data);
            });
        }
        else{
            {alert("لطفا اطلاعات خود را کامل وارد کنید!")}
        }
    }

    handleSignIn = async (event) =>{
        if(this.state.signInEmail && this.state.signInPassword){
            if(!hasDomain(this.state.signInEmail)){
                alert("خطا! دامنه ایمیل وارد نشده است.")
                return;
            }

            this.setState({
                loading: true
            });
            AuthenticationService.login({
                signInEmail: this.state.signInEmail,
                signInPassword: this.state.signInPassword,
            }).then(response => {
                let userJWT = response.data.slice(7 , response.data.length) // Remove Bearer
                AuthenticationService.setUserJWT(userJWT)
                this.setState({
                    redirect: "/home"
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
                alert("مشکلی در ورود پیش آمده است " + error);
            });
        }
        else{
            {alert("لطفا اطلاعات خود را کامل وارد کنید!")}
        }
    }

    handleForgetPassword = async (event) => {
        if(this.state.forgetPasswordEmail){
            if(!hasDomain(this.state.forgetPasswordEmail)){
                alert("خطا! دامنه ایمیل وارد نشده است.")
                return;
            }

            this.setState({
                loading: true
            });

            AuthenticationService.sendForgetPasswordEmail({
                forgetPasswordEmail: this.state.forgetPasswordEmail,
            }).then(response => {
                alert("ایمیل با موفقیت ارسال شد!")
                this.setState({
                    redirect: "/home"
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
                alert("مشکلی در ارسال ایمیل پیش آمده است " + error.response.data);
            });
        }
        else{
            {alert("لطفا ایمیل خود را وارد کنید!")}
        }
    }

    renderLogin(){
        return (
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in"/><label htmlFor="tab-1" className="tab">ورود</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up"/><label htmlFor="tab-2" className="tab">ثبت نام</label>
                    <input id="tab-3" type="radio" name="tab" className="forget-password"/><label htmlFor="tab-3" className="tab">فراموشی رمز عبور</label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">ایمیل</label>
                                <input id="signInEmail" type="text" className="input" onChange={this.setText.bind(this)}/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">رمز عبور</label>
                                <input id="signInPassword" type="password" className="input" data-type="password"
                                                                                      onChange={this.setText.bind(this)}/>
                            </div>
                            <div className="group">
                                <button type="submit" className="button" onClick = {this.handleSignIn}>
                                    ورود
                                </button>
                            </div>
                            {this.state.loading ? this.renderLoading() : ""}
                        </div>
                        <div className="sign-up-htm">
                            <div className="group">
                                <label htmlFor="pass" className="label">نام</label>
                                <input id="name" type="text" className="input" onChange={this.setText.bind(this)} />
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">نام خانوادگی</label>
                                <input id="secondName" type="text" className="input" onChange={this.setText.bind(this)} />
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">شماره دانشجویی</label>
                                <input id="studentId" type="text" className="input" onChange={this.setText.bind(this)} />
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">تاریخ تولد</label>
                                <input id="birthDate" type="text" className="input" onChange={this.setText.bind(this)} />
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">رشته</label>
                                <input id="field" type="text" className="input" onChange={this.setText.bind(this)} />
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">دانشکده</label>
                                <input id="faculty" type="text" className="input" onChange={this.setText.bind(this)} />
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">مقطع</label>
                                <input id="level" type="text" className="input" onChange={this.setText.bind(this)} />
                            </div>
                            <div className="group">
                                <label htmlFor="user" className="label">ایمیل</label>
                                <input id="signUpEmail" type="text" className="input" onChange={this.setText.bind(this)} />
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">رمز عبور</label>
                                <input id="signUpPassword" type="password" className="input" data-type="password"
                                                                                      onChange={this.setText.bind(this)} />
                            </div>
                            <div className="group">
                                <button type="submit" className="button" onClick={this.handleSignup}>
                                    ثبت نام{this.state.loading ? this.renderLoading() : ""}
                                </button>
                            </div>
                        </div>
                        <div className="forget-password-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">ایمیل</label>
                                <input id="forgetPasswordEmail" type="text" className="input" onChange={this.setText.bind(this)}/>
                            </div>
                            <div className="group">
                                <button type="submit" className="button" onClick = {this.handleForgetPassword}>
                                    ارسال ایمیل
                                </button>
                            </div>
                            {this.state.loading ? this.renderLoading() : ""}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderLoading(){
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }


    render() {
        if(this.state.redirect){
            return(
                <Redirect to={this.state.redirect} />
            );
        }
        return(
            this.renderLogin()
        );
    }
}