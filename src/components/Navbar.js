import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { userSession } from '../redux/actions'
import {rgba} from 'polished';
import color from '../assets/colors.scss';

const Navbar = ({ userSession }) => {
    return (
        <Div>
            <div className='logo'></div>
            <div className='menu'>
                <span className='active'>Home</span>
                <span>Settings</span>
            </div>
            <div className='logout' onClick={()=> userSession('logout')}> Logout </div>
        </Div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin
    };
};
export default connect(mapStateToProps, { userSession })(Navbar);

const Div = styled.div`
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid ${color.outline};

    .menu {
        span {
            color: ${color.neutral};
            cursor: pointer;
            font-weight: 500;
            border-radius: 20px;
            padding: .75rem 1.5rem .85rem 1.5rem;

            &.active {
                color: ${color.primary};
                background-color: ${rgba(color.primary, .1)};
            }
        }
    }

    .logout {
        font-weight: 500;
        color: ${color.danger};
        cursor: pointer;
    }
`