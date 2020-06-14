import React from 'react';
import styled from 'styled-components';
import color from '../../assets/colors.scss';
import ReactTooltip from 'react-tooltip'
import { icon_hint } from '../Icon';
import './form.scss';

const SquareInput = (props) => {
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
            <Input {...props}/>
            <p className="input_error">
                {props.error}
            </p>
        </Div>

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
export default SquareInput;

const Div = styled.div`
    position: relative;
    margin-bottom: 1.5rem;
`

const Input = styled.input`
    width: 100% !important;
    padding: .25rem .75rem !important;
    border: 1px solid #dce2e5 !important;
    background-color: ${color.bgTextarea} !important;
    border-radius: 3px !important;
    outline: none;
    color: ${color.black};
    transition: all .15s ease;

    &:focus {
        background-color: #fff !important;
        border: 1px solid ${color.primary} !important;
    }
`;