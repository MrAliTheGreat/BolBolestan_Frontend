import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Login from "./Pages/Login/Login"
import Home from "./Pages/Home/Home"
import Courses from "./Pages/Courses/Courses"
import Schedule from "./Pages/Schedule/Schedule"
import ChangePassword from "./Pages/Login/ChangePassword";
import * as React from "react";

export default class App extends React.Component{

    isLoggedIn(){
        return localStorage.getItem("userJWT") !== null;
    }

    render(){
        return (
            <Router>
                <Switch>
                    <Route path = "/home" render={() => (
                        this.isLoggedIn() ? <Home /> : <Redirect to={"/"} />
                    )}>
                    </Route>
                    <Route path = "/courses" render={() => (
                        this.isLoggedIn() ? <Courses /> : <Redirect to={"/"} />
                    )}>
                    </Route>
                    <Route path = "/schedule" render={() => (
                        this.isLoggedIn() ? <Schedule /> : <Redirect to={"/"} />
                    )}>
                    </Route>
                    <Route path = "/changePassword/:JWT" render={(props) => (
                       this.isLoggedIn() ? <Home /> : <ChangePassword {...props}/>
                    )}>
                    </Route>
                    <Route path="/" exact render={() => (
                        this.isLoggedIn() ? <Home /> : <Login />
                    )}>
                    </Route>
                </Switch>
            </Router>
        );
    }
}
