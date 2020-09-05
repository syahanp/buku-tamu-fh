import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { connect } from "react-redux";
import { userSession } from '../redux/actions'
import { Link } from 'react-router-dom';
import {rgba} from 'polished';
import { icon_home, icon_setting } from './Icon';
import color from '../assets/colors.scss';

const Navbar = ({ userSession }) => {
    
    return (
        <Div>
            <div className='logo'></div>
            <div className='menu'>
                <Link to='/' className='active'>{icon_home} Home</Link>
                {/* <Link to='/setting'> {icon_setting} Settings</Link> */}
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
    padding: 1.5rem 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid ${color.outline};

    .menu {
        text-align: center;

        a {
            text-decoration: none;
            color: ${color.neutral};
            cursor: pointer;
            font-weight: 500;
            border-radius: 20px;
            padding: .75rem 1.5rem .85rem 1.5rem;

            svg {
                margin-right: .5rem;
                font-size: 18px;
            }

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