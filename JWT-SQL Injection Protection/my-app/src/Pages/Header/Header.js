import * as React from "react";
import {Link, Redirect} from "react-router-dom";

import "../../Assets/StylesCSS/Header.css"
import AuthenticationService from "../../Services/AuthenticationService";

import logo from "../../Assets/Pictures/logo.png"

export default class Header extends React.Component{

    render() {
        return(
            <header>
                <div className="header">
                    <div className="BolBolIcon m-1">
                        <img alt="tmp" src={logo}/>
                    </div>
                    <div className="home m-4">
                        <Link to = "/courses">
                            انتخاب واحد
                        </Link>
                    </div>
                    <div className="schedule ml-auto">
                        <Link to = "/schedule">
                            برنامه هفتگی
                        </Link>
                    </div>
                    <div className="logout m-2">
                        <Link to = "/" className="logout_text" onClick = {() => AuthenticationService.logout()}>
                            خروج
                        </Link>
                        <div className="logout_icon">
                            <i className="flaticon-log-out"></i>
                        </div>
                    </div>
                </div>
                <div className="lineUnderHeader"></div>
            </header>
        );
    }
}