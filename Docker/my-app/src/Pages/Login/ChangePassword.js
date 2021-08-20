import * as React from "react";
import "../../Assets/StylesCSS/ChangePassword.css"
import AuthenticationService from "../../Services/AuthenticationService";
import {AxiosWithHeader} from "../../Services/AxiosWithHeader";
import {Redirect} from "react-router-dom";

export default class ChangePassword extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            newPassword: null,

            loading: false,
            redirect: null,
        }
    }

    setText(event){
        if(event.currentTarget.id === "newPassword"){
            this.setState({newPassword: event.target.value});
        }
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

    componentDidMount() {
        AuthenticationService.setUserJWT(this.props.match.params.JWT);
    }

    handleNewPassword = async (event) => {
        if(this.state.newPassword) {
            this.setState({
                loading: true
            });

            AxiosWithHeader.post("http://localhost:8080/changePassword", {
                newPassword: this.state.newPassword,
            }).then(response => {
                if (response.data === "OK") {
                    alert("رمز با موفقیت تغییر کرد!")
                    AuthenticationService.logout();
                    this.setState({
                        redirect: "/home"
                    });
                } else {
                    alert("مشکلی در تغییر رمز پیش آمده است ");
                    this.setState({
                        loading: false
                    });
                }
            }).catch(error => {
                alert("مشکلی در تغییر رمز پیش آمده است " + error);
                this.setState({
                    loading: false
                });
            })
        }
        else{
            alert("لطفا رمز جدید خود را وارد کنید!")
        }
    }

    render(){
        if(this.state.redirect){
            return(
                <Redirect to={this.state.redirect} />
            );
        }

        return(
            <div className="login-wrap_changePassword">
                <div className="login-html_changePassword">
                    <input id="tab-1" type="radio" name="tab" className="sign-in"/><label htmlFor="tab-1"
                                                                                                  className="tab">تغییر رمز عبور</label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <div className="group">
                                <label htmlFor="pass" className="label">رمز عبور جدید</label>
                                <input id="newPassword" type="password" className="input" data-type="password"
                                       onChange={this.setText.bind(this)}/>
                            </div>
                            <div className="group">
                                <button type="submit" className="button" onClick = {this.handleNewPassword}>
                                    تغییر رمز
                                </button>
                            </div>
                            {this.state.loading ? this.renderLoading() : ""}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}