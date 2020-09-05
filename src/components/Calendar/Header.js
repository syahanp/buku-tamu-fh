import React from 'react'
import styled from 'styled-components';
import { format, addMonths } from 'date-fns';
import id from 'date-fns/locale/id';
import { icon_chevronLeft, icon_chevronRight } from '../Icon';
import color from '../../assets/colors.scss';
import LoadingSpinner from '../LoadingSpinner';

const Header = ({ month, setMonth, isLoading }) => {
    return (
        <Div>
            <div className='month_control'>
                <div className="icon prev" onClick={() => setMonth(addMonths(month, -1))}>
                    {icon_chevronLeft}
                </div>
                <div className='current_month'>
                    <h1>{format(month, 'MMMM yyyy', {locale: id})}</h1>
                </div>
                <div className="icon next" onClick={() => setMonth(addMonths(month, 1))}>
                    {icon_chevronRight}
                </div>
            </div>
            <LoadingSpinner loading={isLoading} />
        </Div>
    )
}
export default Header;

const Div = styled.div`
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .month_control {
        display: flex;
        justify-content: center;
        align-items: center;

        .current_month {
            width: 250px;
            margin: 0 auto;

            h1 {
                text-align: center;
            }
        }

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
    }

`