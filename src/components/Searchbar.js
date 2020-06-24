import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import { debounce } from 'lodash'
import {icon_search} from './Icon'
import color from '../assets/colors.scss';

const Searchbar = ({ outputValue, placeholder }) => {
    
    const onChangeFetch = debounce((query) => {
        outputValue && outputValue(query)
    }, 750 )

    return (
        <Formik
            initialValues={{ query : ''}}
            onSubmit={(values) => {
                    if (values.query.length <= 2) {
                        return null
                    }
                }}
            >
            {({
                values,
                handleChange,
            }) => (
                <form autoComplete='off'>
                    <Wrapper>
                        <Icon>{icon_search}</Icon>
                        <Search
                            type="text"
                            name="query"
                            onChange={handleChange}
                            onKeyUp={() => onChangeFetch(values.query)}
                            value={values.query}
                            placeholder={placeholder}
                            autoCorrect="off"
                            spellCheck="false"
                        />
                    </Wrapper>
                </form>
            )}
        </Formik>
    );
}
export default withRouter(Searchbar);

let Wrapper = styled.label`
    display: flex;
    align-items: center;
    padding: 0rem 1.5rem;
    width : 100%;
    height: 60px;
    border-radius: 5px;
    border: 1px solid ${color.outline} !important;
    position: relative;
    background-color: #fff;
    transition: all .15s ease-in-out;
    cursor: text;

    &:focus-within {
        border: 1px solid ${color.primary} !important;
        background-color: #fff !important;
    }
`;

let Search = styled.input`
    color: ${color.black};
    border-radius: 5px;
    font-size: 1rem;
    width: 100%;
    height: 100%;
    border: none;
    background-color: #fff;
    transition: all .15s ease-in-out;

    &::placeholder {
        color: ${color.neutral};
    }

    &:focus {
        background-color: #fff;
    }
`;

const Icon = styled.div`
    font-size: 17px;
    margin-right: .5rem;
    color : ${color.neutral};
`