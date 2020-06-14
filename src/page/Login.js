import React from 'react';
import styled from 'styled-components';

import LoginForm from '../components/Form/LoginForm';

const Login = () => {
    return (
        <Div>
            <div>
                <h1>Login</h1>
                <LoginForm />
            </div>
        </Div>
    )
}
export default Login;

const Div = styled.div`
    min-height: 70vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        text-align: center;
        margin-bottom: 1rem;
    }
`