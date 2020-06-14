import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import ReactTooltip from 'react-tooltip'
import {icon_hint} from '../FontAwesome';
import {rgba} from 'polished';
import 'react-quill/dist/quill.snow.css';
import color from '../../assets/colors.scss'

const TextEditorInput = ({
    onChange,
    name, 
    value,
    label, 
    hint,
    placeholder = 'Tulis pesan...'
}) => {

    const handleChange = (input) => {
        onChange && onChange(name, input)
    }
    
    return (
        <Div>
            <p className='input_label'>
                { label }
                { hint && <span data-tip data-for={name} className='input_hint'>{icon_hint}</span> }
            </p>

            <ReactQuill 
                value={value}
                onChange={handleChange} 
                placeholder={placeholder}
                theme='snow'
            />

            <ReactTooltip 
                className='form_tooltips' 
                id={name} 
                place="right" 
                type="dark" 
                effect="solid"
            >
                <span>{hint}</span>
            </ReactTooltip>
        </Div>
    )
}
export default TextEditorInput;

const Div = styled.div`
    height: 100%;
    position: relative;
    margin-bottom: 1.5rem;

    .quill {
        border: 1px solid #dce2e5;

        .ql-toolbar {
            border: none;
            padding-top: 0rem;
            padding: .5rem 1rem;
            background-color: ${rgba(color.neutral, .1)}
        }
        .ql-container {
            border: none;
            height: 160px;
            overflow-y: auto;

            .ql-editor {
                color: ${color.placeholder};
                transition: all .1s ease-in-out;
                border: 1px solid #fff;

                p, ol, ul, pre, blockquote {
                    font-size: 14px !important;
                }

                &.ql-blank::before {
                    color: ${color.placeholder};
                    top: 1rem; /* karena position absolute, kurang sejajar */
                }

                &:focus {
                    background-color: #fff !important;
                    border: 1px solid ${color.primary} !important;
                }
            }
        }
    }
`