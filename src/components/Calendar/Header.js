import React from 'react'
import styled from 'styled-components';
import { format, addMonths } from 'date-fns';
import id from 'date-fns/locale/id';
import { icon_chevronLeft, icon_chevronRight } from '../Icon';
import color from '../../assets/colors.scss';

const Header = ({ month, setMonth }) => {
    return (
        <Div>
            <div className="icon prev" onClick={() => setMonth(addMonths(month, -1))}>
                {icon_chevronLeft}
            </div>
            <div className='current_month'>
                <h1>{format(month, 'MMMM yyyy', {locale: id})}</h1>
            </div>
            <div className="icon next" onClick={() => setMonth(addMonths(month, 1))}>
                {icon_chevronRight}
            </div>
        </Div>
    )
}
export default Header;

const Div = styled.div`
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
        padding: 1rem 1rem;
        cursor: pointer;
        transition: all .1s ease-in-out;

        svg {
            font-size: 22px;
        }

        &:hover {
            color: ${color.primary};
        }
    }
`