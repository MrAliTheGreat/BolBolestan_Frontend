import * as React from "react";
import "../../Assets/StylesCSS/LoginSignupCSS.css"
import { Redirect } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            redirect: null,
            loading: false
        };
    }

    getUserFromTextBox(event){
        this.setState({username: event.target.value});
    }

    handleReceive = async (event) => {
        if(this.state.username){
            this.setState({
                loading: true
            });
            const data = await fetch(`http://localhost:8080/login/${this.state.username}`);
            const foundStudent = await data.json();
            if(foundStudent.studentId){
                localStorage.setItem("onlineStudentID" , foundStudent.studentId)
                this.setState({
                    redirect: "/home"
                });
            }
            else{
                this.setState({
                    loading: false
                });
                {alert("ایمیل وارد شده پیدا نشد!")}
            }
        }
        else{
            {alert("لطفا ایمیل خود را وارد کنید!")}
        }
    }

    renderLogin(){
        return (
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label htmlFor="tab-1" className="tab">ورود</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up"/><label htmlFor="tab-2" className="tab">ثبت نام</label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">ایمیل</label>
                                <input id="user" type="text" className="input" onChange={this.getUserFromTextBox.bind(this)}/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">رمز عبور</label>
                                <input id="pass" type="password" className="input" data-type="password"/>
                            </div>
                            <div className="group">
                                <button type="submit" className="button" onClick = {this.handleReceive}>
                                    ورود
                                </button>
                            </div>
                            {this.state.loading ? this.renderLoading() : ""}
                        </div>
                        <div className="sign-up-htm">
                            <div className="group">
                                <label htmlFor="pass" className="label">نام</label>
                                <input id="pass" type="text" className="input"/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">نام خانوادگی</label>
                                <input id="pass" type="text" className="input"/>
                            </div>
                            <div className="group">
                                <label htmlFor="user" className="label">ایمیل</label>
                                <input id="user" type="text" className="input"/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">رمز عبور</label>
                                <input id="pass" type="password" className="input" data-type="password"/>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="ثبت نام"/>
                            </div>
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