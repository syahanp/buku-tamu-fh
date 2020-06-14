import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTooltip from 'react-tooltip'
import color from '../../assets/colors.scss';

const Textarea = (props) => {

    const hint = <FontAwesomeIcon icon={['fas', 'question-circle']}/>

    return (
        <Div>
            <p className='input_label'>
                {props.label}
                {
                    props.hint && 
                    <span data-tip data-for={props.name} className='input_hint'>{hint}</span>
                }
            </p>
            
            <TextArea
                rows={props.rows}
                cols={props.cols}
                onChange={props.onChange}
                name={props.name}
                value={props.value}
                maxlength={props.maxlength}
                placeholder={props.placeholder}
            />

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
    );
}
 
export default Textarea;

const Div = styled.div`
    position: relative;
    margin-bottom: 1.5rem;
`

const TextArea = styled.textarea`
    width: 100% !important;
    padding: .75rem !important;
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