import React from 'react';
import './button.scss'
import PulseLoader from 'react-spinners/PulseLoader';
// import PropTypes from 'prop-types';

const BASE_STAYLE = [
    'primary',
    'accent',
    'danger',
    'primary-outline',
    'accent-outline',
    'danger-outline'
]

const BASE_SIZE = ['lg', 'sm', 'jumbo']

export const Button = ({
    children,
    type,
    onClick,
    id,
    className,
    style,
    set,
    round,
    size,
    stacked,
    active,
    isDisabled,
    isLoading,
    isVisible,
    component,
    to,
    ...rest
}) => {

    const pulseLoading = <PulseLoader sizeUnit={'px'} size={10} color={'#fff'} />
    const setType = type ? type : 'button'
    const setBtnStyle = BASE_STAYLE.includes(set) ? set : null;
    const setBtnSize = BASE_SIZE.includes(size) ? size : '';
    const setDisabled = isDisabled ? 'disabled' : '';
    const setRound = round ? 'round' : '';
    const setStacked = stacked ? 'stacked' : ''; 
    const setActive = active ? `${setBtnStyle} active` : '';

    if (component) {
        const Component = component
        
        return (
            <Component
                style={{display : isVisible ? 'inline-block' : 'none'}}
                to={to} 
                type={setType}
                onClick={onClick}
                id={id}
                className={`btn ${setBtnStyle} ${setBtnSize} ${setDisabled} ${setRound} ${setStacked} ${setActive} ${className}`}
                {...rest}
            >
                {children}
            </Component>
        )
    } 

    return (
        <button
            style={{display : isVisible ? 'inline-block' : 'none'}}
            type={setType}
            onClick={onClick}
            disabled={isDisabled}
            id={id}
            className={`btn ${setBtnStyle} ${setBtnSize} ${setDisabled} ${setRound} ${setStacked} ${setActive} ${className}`}
            {...rest}
        >
            {isLoading ? pulseLoading : children}
        </button>
    )
}

Button.defaultProps = {
    isVisible : 'inline-block'
}