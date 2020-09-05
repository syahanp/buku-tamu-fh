import React from 'react';
import styled from 'styled-components';
import color from '../assets/colors.scss';
import { BarLoader } from 'react-spinners';

const LoadingSpinner = ({ loading }) => {
    return (
        <Div>
            <BarLoader
                size={35}
                color={color.primary}
                loading={loading}
            />
        </Div>
    )
}

export default LoadingSpinner;

const Div = styled.div`
    text-align: center;
    margin: 1rem 0rem;
`