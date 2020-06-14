import React, { useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { connect } from "react-redux";
import { userSession } from './redux/actions'
import styled from 'styled-components';
import Cookies from 'js-cookie';
import "@fortawesome/fontawesome-svg-core/styles.css";
import './assets/global.scss';
import PrivateRoute from './routes/PrivateRoute';

import Navbar from './components/Navbar';
import Login from './page/Login';
import Home from './page/Home';
import SingleDays from './page/SingleDays';

const App = ({ isLogin, userSession }) => {

    useEffect(() => {
        if (!Cookies.get('access_jwt') || Cookies.get('access_jwt') === 'undefined') {
            userSession('logout')
        }
        
        if ((Cookies.get('access_jwt') && Cookies.get('refresh_jwt')) || Cookies.get('access_jwt') === 'undefined') {
            userSession('login')
        }

        window.scrollTo(0, 0);
    }, [])

    return (
        <Router>
            {isLogin && <Navbar />}
            <Content>
                <Switch>
                    <Route exact path='/' component={isLogin ? Home : Login}/>
                    <PrivateRoute exact path='/single/:date' component={SingleDays} auth={isLogin}/>
                </Switch>
            </Content>
        </Router>
    )
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin
    };
};
export default connect(mapStateToProps, { userSession })(App);

const Content = styled.div`
    min-height: 90vh;
    padding: 2rem;
`