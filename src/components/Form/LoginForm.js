import React from "react";
import styled from 'styled-components';
import * as Yup from "yup";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik } from "formik";
import { userSession } from "../../redux/actions";
import { baseUrl } from "../../api";
import { setCookiesExpired, toastSuccess, handleFormErrorResponse } from "../../helper";

import SquareInput from "./SquareInput";
import InputPassword from "./InputPassword";
import { Button } from "../Buttons";

const LoginForm = ({ userSession }) => {
    return (
        <Formik
        initialValues={{
            email: "",
            password: "",
        }}
        validationSchema={Yup.object().shape({
            email: Yup.string().email("*Email tidak sesuai").required("*Email dibutuhkan"),
            password: Yup.string().min(6, "*Password minimal 6 karakter").required("*Password dibutuhkan"),
        })}
        onSubmit={(values, { setSubmitting, setStatus }) => {
            setSubmitting(true);

            baseUrl
            .post("api/login", {
                email: values.email,
                password: values.password,
            })
            .then((res) => {
                console.log(res.data);

                Cookies.set("access_jwt", res.data.access_jwt, {
                    expires: setCookiesExpired(process.env.REACT_APP_ACCESS_TOKEN_EXPIRED),
                    domain: `${process.env.REACT_APP_COOKIES_DOMAIN}`,
                });
                Cookies.set("refresh_jwt", res.data.refresh_jwt, {
                    expires: setCookiesExpired(process.env.REACT_APP_REFRESH_TOKEN_EXPIRED),
                    domain: `${process.env.REACT_APP_COOKIES_DOMAIN}`,
                });
                Cookies.set("client", res.data.client.profile, {
                    domain: `${process.env.REACT_APP_COOKIES_DOMAIN}`,
                });

                // save user exclusive features to redux
                userSession("login");
                toastSuccess("Login berhasil", 1000)
            })
            .catch(err => {
                console.log(err.response);
                setStatus({error: err.response.data.errors })
                setSubmitting(false);
            });
        }}
        >
        {({ 
            values, 
            errors, 
            touched, 
            handleChange, 
            handleBlur, 
            handleSubmit, 
            isSubmitting,
            status
        }) => (
            <Div>
                
                {status && status.error && handleFormErrorResponse(status.error)}

                <form onSubmit={handleSubmit}>
                    <SquareInput 
                        type="text" 
                        name="email" 
                        label="Email" 
                        value={values.email} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        error={errors.email && touched.email ? errors.email : null} 
                    />
                    <InputPassword 
                        name="password" 
                        label="Password" 
                        value={values.password} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        error={errors.password && touched.password ? errors.password : null} 
                    />

                    <Button set="primary" type="submit" size="jumbo" isLoading={isSubmitting} isDisabled={isSubmitting} stacked>
                        Masuk
                    </Button>
                </form>
            </Div>
        )}
        </Formik>
    );
};
export default withRouter(connect('', { userSession })(LoginForm));

const Div = styled.div`
    padding: 1.5rem;
    width: 400px;
    box-shadow : 0 15px 20px 0 rgba(0,0,0,.1), 0 5px 15px 0 rgba(0,0,0,.1);
`