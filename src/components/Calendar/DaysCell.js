import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import color from '../../assets/colors.scss';
import { rgba } from 'polished';

const DaysCell = ({ 
    day, 
    currentDate, 
    selectedDate,
    totalVisitor = '', 
    isActive, 
    isDisabled 
}) => {  

    return (
        <Div 
            to={{
                pathname: `/single/${currentDate}`,
                state: {selectedDate}
            }} 
            className={`cell ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
        >
            <span className='day'>{day}</span>
            <div className='visitor'>{totalVisitor}</div>
        </Div>
    )
}
export default DaysCell;

const Div = styled(Link)`
    cursor: pointer;
    position: relative;
    flex-grow: 1;
    flex-basis: 0;
    height: 6em;
    text-decoration: none;
    border-right: 1px solid ${color.tableBorder};
    border-top: 1px solid ${color.tableBorder};
    max-width: 100%;
    background-color: #fff;
    transition: .2s ease-in-out;

    &:hover {
        background-color: ${rgba(color.primary, .05)};
        .visitor {
            color: ${color.primary};
        }
    }

    .day {
        position: absolute;
        right: 10px;
        top: 8px;
        color: ${color.fontPrimary};
        font-weight: 500;
        font-size: 14px;
    }

    .visitor {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        color: #e8e8e8;
        font-size: 38px;
        transition: .2s ease-in-out;
    }

    &.disabled {
        /* background-color: ${color.tableDisable} !important; */

        .day {
            color: #ccc !important;
        }
    }

    &.active {
        .day {
            right: 16px;
            top: 16px;
            height: 6px;
            width: 6px;
            background-color: ${color.primary};
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0px 0px 0px 12px ${color.primary};
            color: #fff;
        }
    }
`