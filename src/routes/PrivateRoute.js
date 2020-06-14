import React from "react";
import Cookies from "js-cookie";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userSession } from "../redux/actions";
// import ErrorBounderies from '../components/ErrorBounderies';
import { setLastVisit, validateToken } from "../helper";

const PrivateRoute = ({ component: Component, auth, userSession, ...rest }) => {
    const token = Cookies.get("access_jwt");
    const isValid = validateToken();

    if (auth && token) {
        return (
            <Route
            {...rest}
            render={(props) => {
                return <Component {...props} />;
            }}
            />
        );
    } 
    else {
        setLastVisit();
        userSession("logout");

        return (
            <Redirect
            to={{
                pathname: "/",
                state: { status_msg: "Silahkah login kembali" },
            }}
            />
        );
    }
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};
export default connect(mapStateToProps, { userSession })(PrivateRoute);
