import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import ReactTooltip from 'react-tooltip'
// import { icon_hint } from '../Icon';
import './form.scss';

const SelectInput = ({
    name,
    label,
    value,
    hint, 
    defaultValue,
    options,
    onChange,
    onBlur,
    isDisabled,
    error,
    ...props
}) => {
    return (
        <Div>
            <p className='input_label'>
                {label}
                {
                    hint && 
                    <span data-tip data-for={name} className='input_hint'>
                        {/* {icon_hint} */}
                    </span>
                }
            </p>
            
            <Select
                {...props}
                className="defaultSelect_container"
                classNamePrefix="defaultSelect"
                name={name}
                value={value}
                defaultValue={defaultValue}
                options={options}
                onChange={onChange}
                onBlur={onBlur}
                isDisabled={isDisabled}
            />
            <p className="input_error">{error}</p>

            <ReactTooltip 
                className='form_tooltips' 
                id={props.name} 
                place="right" 
                type="dark" 
                effect="solid"
            >
                <span>{props.hint}</span>
            </ReactTooltip>
        </Div>
    )
}
export default SelectInput;

const Div = styled.div`
    position: relative;
    margin-bottom: 1.5rem;
    width: 100%;
`