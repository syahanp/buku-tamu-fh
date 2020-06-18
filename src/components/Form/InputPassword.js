import React, {useState} from 'react';
import styled from 'styled-components';
import color from '../../assets/colors.scss';
import ReactTooltip from 'react-tooltip'
import {icon_pass_invisible, icon_pass_visible, icon_hint} from '../Icon';
import './form.scss';

const InputPassword = (props) => {

    const [isVisible, setVisible] = useState(false)

    return (
        <>
        <Div>
            <p className='input_label'>
                {props.label}
                {
                    props.hint &&
                    <span data-tip data-for={props.name} className='input_hint'>
                        {icon_hint}
                    </span>
                }
            </p>
            
            <Input 
                type = {isVisible ? 'text' : 'password'}
                {...props}
            />
            
            {
                <Visibility 
                    color={isVisible ? color.black : color.neutral} 
                    onClick={() => setVisible(!isVisible)}
                >
                    { isVisible ? icon_pass_visible : icon_pass_invisible }
                </Visibility>
            }
        </Div>

        {
            props.error &&
            <p className="input_error" style={{marginTop : '-1.5rem'}}>
                {props.error}
            </p>
        }
        
        {/* TOOLTIPS FOR HINT */}
        <ReactTooltip 
            className='form_tooltips' 
            id={props.name} 
            place="right" 
            type="dark" 
            effect="solid"
        >
            <span>{props.hint}</span>
        </ReactTooltip>
        </>
    )
}
export default InputPassword;


const Div = styled.div`
    position: relative;
    margin-bottom: 1.25rem;
`

const Input = styled.input`
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
`

const Visibility = styled.div`
    color: ${props => props.color};
    position: absolute;
    right: 1rem;
    top: calc(50%);
    cursor: pointer;
    font-size: 18px;
    user-select: none;
`