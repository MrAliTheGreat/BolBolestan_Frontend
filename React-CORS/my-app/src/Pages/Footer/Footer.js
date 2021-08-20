import * as React from "react";

import "../../Assets/StylesCSS/Footer.css"

export default class Footer extends React.Component{
    render() {
        return(
            <footer>
                <div className="footer">
                    <div className="icon m-2">
                        <div className="copyright">
                            <i className="flaticon-copyright"></i>
                        </div>
                    </div>
                    <div className="footer_text ml-auto">
                        دانشگاه تهران - سامانه جامع بلبل ستان
                    </div>
                    <div className="icon m-2">
                        <div className="socialMedia">
                            <i className="flaticon-twitter-logo-on-black-background"></i>
                        </div>
                    </div>
                    <div className="icon m-2">
                        <div className="socialMedia">
                            <i className="flaticon-instagram"></i>
                        </div>
                    </div>
                    <div className="icon m-2">
                        <div className="socialMedia">
                            <i className="flaticon-linkedin-logo"></i>
                        </div>
                    </div>
                    <div className="icon m-2">
                        <div className="socialMedia">
                            <i className="flaticon-facebook"></i>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}