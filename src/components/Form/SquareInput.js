import React from 'react';
import styled from 'styled-components';
import color from '../../assets/colors.scss';
import ReactTooltip from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './form.scss';

const SquareInput = ({
    label, 
    hint, 
    name, 
    type,
    placeholder,
    error,
    value, 
    children, 
    onChange,
    onBlur
}) => {
    const hintIcon = <FontAwesomeIcon icon={['fas', 'question-circle']}/>
    
    return (
        <Div>
            {
                label && 
                <p className='input_label'>
                    {label}
                    {
                        hint &&
                        <span data-tip data-for={name} className='input_hint'>{hint}</span>
                    }
                </p>
            }
            
            {
                children ? 
                children :
                <input 
                    className='text_input' 
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                />
            }
            <p className="input_error">{error}</p>

            <ReactTooltip 
                className='form_tooltips' 
                id={name} 
                place="right" 
                type="dark" 
                effect="solid"
            >
                <span>{hintIcon}</span>
            </ReactTooltip>
        </Div>
    )
}
export default SquareInput;

const Div = styled.div`
    position: relative;
    margin-bottom: 1.25rem;

    input {
        width: 100% !important;
        padding: .25rem .75rem !important;
        height: 48px;
        border: 1px solid #d8d8d8 !important;
        background-color: #fff !important;
        border-radius: 3px !important;
        outline: none;
        color: ${color.black};
        font-weight: 500;
        transition: all .15s ease;

        &::placeholder {
            color: ${color.neutral};
            font-weight: 500;
        }

        &:focus {
            background-color: #fff !important;
            border: 1px solid ${color.primary} !important;
        }
    }
`