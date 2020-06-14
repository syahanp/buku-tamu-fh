import React from 'react'
import styled from 'styled-components';
import { icon_chevronLeft, icon_chevronRight } from '../Icon';

const Header = () => {
    return (
        <Div>
            <div className="icon prev">{icon_chevronLeft}</div>
            <div className='current_month'>
                <h1>JUNI 2020</h1>
            </div>
            <div className="icon next">{icon_chevronRight}</div>
        </Div>
    )
}
export default Header;

const Div = styled.div`
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .current_month {
        margin: 0rem 2.5rem;
    }

    .icon svg {
        font-size: 22px;
    }
`